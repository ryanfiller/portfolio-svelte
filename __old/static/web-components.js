(function () {
    'use strict';

    function noop() { }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.wholeText !== data)
            text.data = data;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    class HtmlTag {
        constructor(is_svg = false) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                else
                    this.e = element(target.nodeName);
                this.t = target;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }
    function attribute_to_object(attributes) {
        const result = {};
        for (const attribute of attributes) {
            result[attribute.name] = attribute.value;
        }
        return result;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    let SvelteElement;
    if (typeof HTMLElement === 'function') {
        SvelteElement = class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            connectedCallback() {
                const { on_mount } = this.$$;
                this.$$.on_disconnect = on_mount.map(run).filter(is_function);
                // @ts-ignore todo: improve typings
                for (const key in this.$$.slotted) {
                    // @ts-ignore todo: improve typings
                    this.appendChild(this.$$.slotted[key]);
                }
            }
            attributeChangedCallback(attr, _oldValue, newValue) {
                this[attr] = newValue;
            }
            disconnectedCallback() {
                run_all(this.$$.on_disconnect);
            }
            $destroy() {
                destroy_component(this, 1);
                this.$destroy = noop;
            }
            $on(type, callback) {
                // TODO should this delegate to addEventListener?
                const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
                callbacks.push(callback);
                return () => {
                    const index = callbacks.indexOf(callback);
                    if (index !== -1)
                        callbacks.splice(index, 1);
                };
            }
            $set($$props) {
                if (this.$$set && !is_empty($$props)) {
                    this.$$.skip_bound = true;
                    this.$$set($$props);
                    this.$$.skip_bound = false;
                }
            }
        };
    }

    var mdastUtilToString = toString;

    // Get the text content of a node.
    // Prefer the node’s plain-text fields, otherwise serialize its children,
    // and if the given value is an array, serialize the nodes in it.
    function toString(node) {
      return (
        (node &&
          (node.value ||
            node.alt ||
            node.title ||
            ('children' in node && all(node.children)) ||
            ('length' in node && all(node)))) ||
        ''
      )
    }

    function all(values) {
      var result = [];
      var length = values.length;
      var index = -1;

      while (++index < length) {
        result[index] = toString(values[index]);
      }

      return result.join('')
    }

    /* eslint-disable no-multi-spaces */
    function slugify(input) {
      // this function has been increasingly problematic the more it gets used with markdown stuff...
      const string = typeof input === 'string' ? input : mdastUtilToString(input);

      return string.toString().toLowerCase()
        .replace(/\s+/g, '-')       // Replace spaces with -
        .replace(/[^\w-]+/g, '')    // Remove all non-word chars
        .replace(/--+/g, '-')       // Replace multiple - with single -
        .replace(/^-+/, '')         // Trim - from start of text
        .replace(/-+$/, '')         // Trim - from end of text
    }

    /* src/web-components/note.svelte generated by Svelte v3.50.0 */

    function create_fragment$3(ctx) {
    	let section;
    	let header;
    	let strong;
    	let slot0;
    	let t0;
    	let header_id_value;
    	let t1;
    	let div;
    	let slot1;
    	let div_id_value;
    	let section_aria_labelledby_value;

    	return {
    		c() {
    			section = element("section");
    			header = element("header");
    			strong = element("strong");
    			slot0 = element("slot");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			div = element("div");
    			slot1 = element("slot");
    			this.c = noop;
    			attr(slot0, "name", "heading");
    			attr(slot0, "part", "title");
    			attr(strong, "class", "title");
    			attr(header, "id", header_id_value = `${/*id*/ ctx[1]}-title`);
    			attr(div, "class", "content");
    			attr(div, "id", div_id_value = `${/*id*/ ctx[1]}-content`);
    			attr(section, "class", "note");
    			attr(section, "role", "note");
    			attr(section, "aria-labelledby", section_aria_labelledby_value = `${/*id*/ ctx[1]}-title`);
    			attr(section, "tabindex", "0");
    			attr(section, "id", /*id*/ ctx[1]);
    		},
    		m(target, anchor) {
    			insert(target, section, anchor);
    			append(section, header);
    			append(header, strong);
    			append(strong, slot0);
    			append(slot0, t0);
    			append(section, t1);
    			append(section, div);
    			append(div, slot1);
    			/*section_binding*/ ctx[3](section);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data(t0, /*title*/ ctx[0]);

    			if (dirty & /*id*/ 2 && header_id_value !== (header_id_value = `${/*id*/ ctx[1]}-title`)) {
    				attr(header, "id", header_id_value);
    			}

    			if (dirty & /*id*/ 2 && div_id_value !== (div_id_value = `${/*id*/ ctx[1]}-content`)) {
    				attr(div, "id", div_id_value);
    			}

    			if (dirty & /*id*/ 2 && section_aria_labelledby_value !== (section_aria_labelledby_value = `${/*id*/ ctx[1]}-title`)) {
    				attr(section, "aria-labelledby", section_aria_labelledby_value);
    			}

    			if (dirty & /*id*/ 2) {
    				attr(section, "id", /*id*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(section);
    			/*section_binding*/ ctx[3](null);
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { title } = $$props;
    	let { id = slugify(title) } = $$props;
    	let component;
    	let isSvelteComponent;

    	onMount(() => {
    		isSvelteComponent = Object.keys(component).includes('__svelte_meta');

    		if (!isSvelteComponent) {
    			// shadow dom timing is weird, use a timeout to fire this when the browser event loop is empty
    			setTimeout(() => {
    				if (component) {
    					$$invalidate(0, title = component.querySelectorAll('slot[name="heading"]')[0].assignedElements()[0].innerText);
    					$$invalidate(1, id = id || slugify(title));
    					$$invalidate(2, component.id = id, component);
    				}
    			});
    		}
    	});

    	function section_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			component = $$value;
    			$$invalidate(2, component);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('id' in $$props) $$invalidate(1, id = $$props.id);
    	};

    	return [title, id, component, section_binding];
    }

    class Note extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.note{position:relative}.note::after{content:'';display:block;position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;pointer-events:none;color:var(--colorHighlight);background:var(--pixelBorder)}.note .content{background-color:var(--colorBackground);color:var(--colorText);padding:var(--padding);border-end-end-radius:var(--pixelBorderRadius);border-end-start-radius:var(--pixelBorderRadius);max-block-size:100%;max-height:var(--noteMaxHeight);overflow:auto}.title{min-block-size:var(--tapableSize)}.title,:global([slot='heading']),:global(rf-alert [slot='heading']),:global(rf-note::part(title)){display:flex;justify-content:space-between;align-items:center;overflow:hidden;border-start-end-radius:var(--pixelBorderRadius);border-start-start-radius:var(--pixelBorderRadius);background-color:var(--colorHighlight);color:var(--colorBackground);padding-block:calc(0.75 * var(--padding));-webkit-padding-start:var(--padding);padding-inline-start:var(--padding);-webkit-padding-end:calc(0.75 * var(--padding));padding-inline-end:calc(0.75 * var(--padding));-webkit-padding-end:var(--buttonPadding, calc(0.75 * var(--padding)));padding-inline-end:var(--buttonPadding, calc(0.75 * var(--padding)));margin:0;font-size:1.25em;font-family:var(--fontDisplay);font-variation-settings:"wght" 450, "wdth" 100, "YOPQ" 122;line-height:1}:global([slot='heading']){font-size:inherit;padding:0;border-radius:0}:global([data-no-js]) :global(rf-note){padding:var(--padding);background:var(--pixelBorder)}:global([data-no-js]) :global([slot='heading']){color:inherit;background:transparent none repeat 0 0 / auto auto padding-box border-box scroll;background:initial}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$3,
    			create_fragment$3,
    			safe_not_equal,
    			{ title: 0, id: 1 },
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["title", "id"];
    	}

    	get title() {
    		return this.$$.ctx[0];
    	}

    	set title(title) {
    		this.$$set({ title });
    		flush();
    	}

    	get id() {
    		return this.$$.ctx[1];
    	}

    	set id(id) {
    		this.$$set({ id });
    		flush();
    	}
    }

    const tabbableElements = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      'details'
    ];

    let focusableElements = [];

    function findFocusableElements(element) {
      const isFocusable = (element) => {
        return element.tabIndex || tabbableElements.includes(element.tagName.toLowerCase())
      };

      const searchThroughChildren = (children) => {
        children.forEach(child => {
          if (isFocusable(child)) focusableElements.push(child);
          if (child.children.length) searchThroughChildren([...child.children]);
        });
      };

      // get EVERY element
      element.querySelectorAll('*')
        .forEach(child => {
          // see if we need to recurse into a shadow dom 
          if (child.shadowRoot) {
            findFocusableElements(child.shadowRoot);
            
          // dig through all the slotted content
          } else if (child.tagName === 'SLOT') {
            searchThroughChildren(child.assignedElements({ flatten: true }));
            
          // get the light dom elements that match the list
          } else if (isFocusable(child)) {
            focusableElements.push(child);
          }
        });
    }

    function manageFocus(event) {
      // immediate exit for all other keys
      if (!(event.key === 'Tab' || event.keyCode === 9)) return

      event.preventDefault();

      const currentElementIndex = event.target.shadowRoot
       ? focusableElements.indexOf(event.target.shadowRoot.activeElement)
       : focusableElements.indexOf(event.target);

      const focusNotInsideTrap = currentElementIndex === -1;
      const last = focusableElements.length - 1;

      if (event.shiftKey) {
        // if at the start, go to end
        (currentElementIndex === 0 || currentElementIndex === -1)
          ? focusableElements[last].focus()
          : focusableElements[currentElementIndex - 1].focus();
      } else {
        (currentElementIndex === last || focusNotInsideTrap)
          ? focusableElements[0].focus()
          : focusableElements[currentElementIndex + 1].focus();
      }
    }

    function focusTrap(element) {
      let triggerElement;

      return {
        // subscribe to the action param
        update(isActive) {
          if (isActive) {

            // save this so we can return focus to it later, but only the first time
            if (!triggerElement) {
              triggerElement = document.activeElement;
            }

            // setTimeout to wait for the event loops for web components
            setTimeout(() => {
              // get the focusable stuff
              findFocusableElements(element);
              // get rid of the disabled or tab-hidden things
              focusableElements = focusableElements.filter(element => !(element.hasAttribute('disabled') || element.tabIndex === -1));
              // remove duplicate elements
              focusableElements = [...new Set(focusableElements)];
            });

          
            document.addEventListener('keydown', manageFocus);
          } else {
            document.removeEventListener('keydown', manageFocus);
            triggerElement && triggerElement.focus();
          }
        }
      }
    }

    /* src/web-components/alert.svelte generated by Svelte v3.50.0 */

    const { document: document_1 } = globals;

    function create_if_block_4(ctx) {
    	let html_tag;

    	let raw_value = `
      <${'style'}>
        body:not([data-no-js]) #${/*id*/ ctx[2]} {
          display: none;
        }
      </${'style'}>
    ` + "";

    	let html_anchor;

    	return {
    		c() {
    			html_tag = new HtmlTag(false);
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    			insert(target, html_anchor, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*id*/ 4 && raw_value !== (raw_value = `
      <${'style'}>
        body:not([data-no-js]) #${/*id*/ ctx[2]} {
          display: none;
        }
      </${'style'}>
    ` + "")) html_tag.p(raw_value);
    		},
    		d(detaching) {
    			if (detaching) detach(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};
    }

    // (257:2) {#if noJs}
    function create_if_block_3(ctx) {
    	let input;
    	let t0;
    	let label;

    	return {
    		c() {
    			input = element("input");
    			t0 = space();
    			label = element("label");
    			label.innerHTML = `<span aria-hidden="true">close the alert</span>`;
    			attr(input, "id", "no-js-close-button");
    			attr(input, "name", "no-js-close-button");
    			set_style(input, "display", "none");
    			attr(input, "type", "checkbox");
    			input.checked = /*show*/ ctx[0];
    			attr(input, "autocomplete", "false");
    			attr(label, "tabindex", "-1");
    			attr(label, "for", "no-js-close-button");
    			set_style(label, "display", "none");
    		},
    		m(target, anchor) {
    			insert(target, input, anchor);
    			insert(target, t0, anchor);
    			insert(target, label, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*show*/ 1) {
    				input.checked = /*show*/ ctx[0];
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(input);
    			if (detaching) detach(t0);
    			if (detaching) detach(label);
    		}
    	};
    }

    // (301:4) {:else}
    function create_else_block(ctx) {
    	let rf_note;
    	let slot0;
    	let t0;
    	let t1;
    	let slot1;
    	let t2;
    	let slot2;
    	let rf_note_id_value;
    	let if_block = !(/*close*/ ctx[3] === false || /*close*/ ctx[3] === 'false') && create_if_block_2(ctx);

    	return {
    		c() {
    			rf_note = element("rf-note");
    			slot0 = element("slot");
    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			slot1 = element("slot");
    			t2 = space();
    			slot2 = element("slot");
    			attr(slot0, "name", "heading");
    			attr(slot0, "slot", "heading");
    			attr(slot2, "name", "actions");
    			attr(slot2, "part", "actions");
    			set_custom_element_data(rf_note, "part", "note");
    			set_custom_element_data(rf_note, "id", rf_note_id_value = `${/*id*/ ctx[2]}-alert`);
    			set_custom_element_data(rf_note, "title", /*title*/ ctx[1]);
    		},
    		m(target, anchor) {
    			insert(target, rf_note, anchor);
    			append(rf_note, slot0);
    			append(rf_note, t0);
    			if (if_block) if_block.m(rf_note, null);
    			append(rf_note, t1);
    			append(rf_note, slot1);
    			append(rf_note, t2);
    			append(rf_note, slot2);
    		},
    		p(ctx, dirty) {
    			if (!(/*close*/ ctx[3] === false || /*close*/ ctx[3] === 'false')) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					if_block.m(rf_note, t1);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*id*/ 4 && rf_note_id_value !== (rf_note_id_value = `${/*id*/ ctx[2]}-alert`)) {
    				set_custom_element_data(rf_note, "id", rf_note_id_value);
    			}

    			if (dirty & /*title*/ 2) {
    				set_custom_element_data(rf_note, "title", /*title*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(rf_note);
    			if (if_block) if_block.d();
    		}
    	};
    }

    // (283:4) {#if isSvelteComponent}
    function create_if_block$1(ctx) {
    	let note;
    	let current;

    	note = new Note({
    			props: {
    				id: `${/*id*/ ctx[2]}-alert`,
    				title: /*title*/ ctx[1],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(note.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(note, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const note_changes = {};
    			if (dirty & /*id*/ 4) note_changes.id = `${/*id*/ ctx[2]}-alert`;
    			if (dirty & /*title*/ 2) note_changes.title = /*title*/ ctx[1];

    			if (dirty & /*$$scope, close*/ 1032) {
    				note_changes.$$scope = { dirty, ctx };
    			}

    			note.$set(note_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(note.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(note.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(note, detaching);
    		}
    	};
    }

    // (310:8) {#if !(close === false || close === 'false')}
    function create_if_block_2(ctx) {
    	let button;
    	let button_disabled_value;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			button = element("button");
    			attr(button, "type", "button");
    			attr(button, "title", "close");
    			button.disabled = button_disabled_value = /*close*/ ctx[3] === false;
    		},
    		m(target, anchor) {
    			insert(target, button, anchor);

    			if (!mounted) {
    				dispose = listen(button, "click", /*handleClose*/ ctx[7]);
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty & /*close*/ 8 && button_disabled_value !== (button_disabled_value = /*close*/ ctx[3] === false)) {
    				button.disabled = button_disabled_value;
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(button);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    // (288:8) {#if !(close === false || close === 'false')}
    function create_if_block_1(ctx) {
    	let button;
    	let button_disabled_value;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			button = element("button");
    			attr(button, "type", "button");
    			attr(button, "title", "close");
    			button.disabled = button_disabled_value = /*close*/ ctx[3] === false;
    		},
    		m(target, anchor) {
    			insert(target, button, anchor);

    			if (!mounted) {
    				dispose = listen(button, "click", /*handleClose*/ ctx[7]);
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty & /*close*/ 8 && button_disabled_value !== (button_disabled_value = /*close*/ ctx[3] === false)) {
    				button.disabled = button_disabled_value;
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(button);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    // (284:6) <Note         id={`${id}-alert`}         title={title}       >
    function create_default_slot(ctx) {
    	let t0;
    	let slot0;
    	let t1;
    	let slot1;
    	let if_block = !(/*close*/ ctx[3] === false || /*close*/ ctx[3] === 'false') && create_if_block_1(ctx);

    	return {
    		c() {
    			if (if_block) if_block.c();
    			t0 = space();
    			slot0 = element("slot");
    			t1 = space();
    			slot1 = element("slot");
    			attr(slot1, "name", "actions");
    		},
    		m(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert(target, t0, anchor);
    			insert(target, slot0, anchor);
    			insert(target, t1, anchor);
    			insert(target, slot1, anchor);
    		},
    		p(ctx, dirty) {
    			if (!(/*close*/ ctx[3] === false || /*close*/ ctx[3] === 'false')) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(t0.parentNode, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(slot0);
    			if (detaching) detach(t1);
    			if (detaching) detach(slot1);
    		}
    	};
    }

    function create_fragment$2(ctx) {
    	let if_block0_anchor;
    	let t0;
    	let section;
    	let t1;
    	let dialog_1;
    	let current_block_type_index;
    	let if_block2;
    	let dialog_1_aria_labelledby_value;
    	let dialog_1_aria_describedby_value;
    	let focusTrap_action;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*noJs*/ ctx[4] && create_if_block_4(ctx);
    	let if_block1 = /*noJs*/ ctx[4] && create_if_block_3(ctx);
    	const if_block_creators = [create_if_block$1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*isSvelteComponent*/ ctx[6]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c() {
    			if (if_block0) if_block0.c();
    			if_block0_anchor = empty();
    			t0 = space();
    			section = element("section");
    			if (if_block1) if_block1.c();
    			t1 = space();
    			dialog_1 = element("dialog");
    			if_block2.c();
    			this.c = noop;
    			attr(dialog_1, "part", "dialog");
    			attr(dialog_1, "aria-labelledby", dialog_1_aria_labelledby_value = `${/*id*/ ctx[2]}-title`);
    			attr(dialog_1, "aria-describedby", dialog_1_aria_describedby_value = `${/*id*/ ctx[2]}-content`);
    			attr(section, "role", "alert");
    			attr(section, "id", /*id*/ ctx[2]);
    			attr(section, "class", "alert");
    		},
    		m(target, anchor) {
    			if (if_block0) if_block0.m(document_1.head, null);
    			append(document_1.head, if_block0_anchor);
    			insert(target, t0, anchor);
    			insert(target, section, anchor);
    			if (if_block1) if_block1.m(section, null);
    			append(section, t1);
    			append(section, dialog_1);
    			if_blocks[current_block_type_index].m(dialog_1, null);
    			/*section_binding*/ ctx[9](section);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen(window, "keydown", /*handleClose*/ ctx[7]),
    					action_destroyer(focusTrap_action = focusTrap.call(null, dialog_1, /*show*/ ctx[0]))
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (/*noJs*/ ctx[4]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_4(ctx);
    					if_block0.c();
    					if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*noJs*/ ctx[4]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_3(ctx);
    					if_block1.c();
    					if_block1.m(section, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block2 = if_blocks[current_block_type_index];

    				if (!if_block2) {
    					if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block2.c();
    				} else {
    					if_block2.p(ctx, dirty);
    				}

    				transition_in(if_block2, 1);
    				if_block2.m(dialog_1, null);
    			}

    			if (!current || dirty & /*id*/ 4 && dialog_1_aria_labelledby_value !== (dialog_1_aria_labelledby_value = `${/*id*/ ctx[2]}-title`)) {
    				attr(dialog_1, "aria-labelledby", dialog_1_aria_labelledby_value);
    			}

    			if (!current || dirty & /*id*/ 4 && dialog_1_aria_describedby_value !== (dialog_1_aria_describedby_value = `${/*id*/ ctx[2]}-content`)) {
    				attr(dialog_1, "aria-describedby", dialog_1_aria_describedby_value);
    			}

    			if (focusTrap_action && is_function(focusTrap_action.update) && dirty & /*show*/ 1) focusTrap_action.update.call(null, /*show*/ ctx[0]);

    			if (!current || dirty & /*id*/ 4) {
    				attr(section, "id", /*id*/ ctx[2]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block2);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block2);
    			current = false;
    		},
    		d(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			detach(if_block0_anchor);
    			if (detaching) detach(t0);
    			if (detaching) detach(section);
    			if (if_block1) if_block1.d();
    			if_blocks[current_block_type_index].d();
    			/*section_binding*/ ctx[9](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { show = false } = $$props;
    	let { close = false } = $$props;
    	let { title } = $$props;
    	let { id } = $$props;
    	let { noJs = false } = $$props;
    	id = id || `${slugify(title)}`;
    	let component, dialog;
    	let isSvelteComponent = true; // this needs to default to true in this component becasue of the noJS prop

    	onMount(() => {
    		$$invalidate(6, isSvelteComponent = Object.keys(component).includes('__svelte_meta'));

    		// shadow dom timing is weird, use a timeout to fire this when the browser event loop is empty
    		setTimeout(() => {
    			if (component) $$invalidate(8, dialog = component.getElementsByTagName('dialog')[0]);
    		});

    		if (!isSvelteComponent) {
    			setTimeout(() => {
    				if (component) {
    					$$invalidate(1, title = component.querySelectorAll('slot[name="heading"]')[0].assignedElements()[0].innerText);
    					$$invalidate(2, id = id || slugify(title));
    				}
    			});
    		}
    	});

    	function handleClose(event) {
    		if (!show || close === false || close === 'false') return;

    		if (event.type === 'keydown' && event.key === 'Escape' || event.type === 'click') {
    			if (close && typeof close === 'function') {
    				// use the external close function...
    				close();
    			} else {
    				// ... or not
    				if (!isSvelteComponent) {
    					document.querySelectorAll('rf-alert[show="true"]')[0] && document.querySelectorAll('rf-alert[show="true"]')[0].setAttribute('show', false);
    				}

    				$$invalidate(0, show = false);
    			}
    		}
    	}

    	function section_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			component = $$value;
    			$$invalidate(5, component);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('show' in $$props) $$invalidate(0, show = $$props.show);
    		if ('close' in $$props) $$invalidate(3, close = $$props.close);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('id' in $$props) $$invalidate(2, id = $$props.id);
    		if ('noJs' in $$props) $$invalidate(4, noJs = $$props.noJs);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*dialog, noJs, show*/ 273) {
    			if (dialog && !noJs) {
    				show === true || show === 'true'
    				? dialog.showModal()
    				: dialog.close();
    			}
    		}
    	};

    	return [
    		show,
    		title,
    		id,
    		close,
    		noJs,
    		component,
    		isSvelteComponent,
    		handleClose,
    		dialog,
    		section_binding
    	];
    }

    class Alert extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>:global(.note),:global(rf-alert::part(note)){--noteMaxHeight:50vh;--buttonPadding:var(--buttonSize)}.alert{--buttonSize:calc(1.25em + (2 * (0.75 * var(--padding))));position:fixed;top:0;right:0;left:0;bottom:0;z-index:1000;display:grid;grid-template-columns:auto minmax(auto, var(--readableMax)) auto;grid-template-rows:auto auto auto;padding:calc(2 * var(--padding));opacity:1;transition:calc(1.5 * var(--transitionSpeed));visibility:visible;pointer-events:none}.alert *{pointer-events:initial}.alert dialog{box-sizing:border-box;padding:0;grid-column:2 / 3;grid-row:2 / 3;background-color:transparent;width:100%;max-inline-size:var(--readableMax);border-block:none;border-inline:calc(2 * var(--padding)) solid transparent}.alert button[title='close']{position:absolute;inset-block-start:0;inset-inline-end:0;z-index:100;border-radius:var(--pixelBorderRadius);background:transparent;border-style:none;cursor:pointer;grid-column:2 / 3;grid-row:2 / 3;align-self:start;justify-self:end;height:var(--buttonSize);width:var(--buttonSize);padding:calc(0.5 * var(--padding));display:flex;align-items:center;justify-content:center}.alert button[title='close']::after{content:'';display:block;color:var(--colorBackground);height:calc(5 * var(--pixelSize));width:calc(5 * var(--pixelSize));background:var(--pixelX);transform:scale(200%);transition:0ms}.alert button[title='close']:hover::after,.alert button[title='close']:focus::after{background:var(--pixelXHover);transition:var(--transitionSpeedIcons)}:global([slot='actions']){display:flex;justify-content:end;gap:1em}:global([data-no-js]) .alert{pointer-events:none}:global([data-no-js]) .alert *{pointer-events:auto !important}:global([data-no-js]) dialog,:global([data-no-js]) label{display:none !important;border:none}:global([data-no-js]) input{opacity:0}:global([data-no-js]) input,:global([data-no-js]) label{position:relative;z-index:100;cursor:pointer;grid-column:2 / 3;align-self:start;grid-row:2 / 3;justify-self:end;height:var(--buttonSize);width:var(--buttonSize);padding:calc(0.5 * var(--padding));display:flex;align-items:center;justify-content:center}:global([data-no-js]) input::after,:global([data-no-js]) label::after{content:'';display:block;color:var(--colorBackground);height:calc(5 * var(--pixelSize));width:calc(5 * var(--pixelSize));background:var(--pixelX);transform:scale(200%);transition:0ms}:global([data-no-js]) input:focus~label{outline:2px auto Highlight}:global([data-no-js]) input:hover~label::after,:global([data-no-js]) input:focus~label::after{background:var(--pixelXHover);transition:var(--transitionSpeedIcons)}:global([data-no-js]) input:checked,:global([data-no-js]) input:checked~label,:global([data-no-js]) input:checked~dialog{display:flex !important;visibility:visible !important}:global([data-no-js]) input:checked~dialog::after{content:'';position:fixed;top:0;right:0;bottom:0;left:0;z-index:-1;-webkit-backdrop-filter:brightness(50%);backdrop-filter:brightness(50%)}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$2,
    			create_fragment$2,
    			safe_not_equal,
    			{
    				show: 0,
    				close: 3,
    				title: 1,
    				id: 2,
    				noJs: 4
    			},
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["show", "close", "title", "id", "noJs"];
    	}

    	get show() {
    		return this.$$.ctx[0];
    	}

    	set show(show) {
    		this.$$set({ show });
    		flush();
    	}

    	get close() {
    		return this.$$.ctx[3];
    	}

    	set close(close) {
    		this.$$set({ close });
    		flush();
    	}

    	get title() {
    		return this.$$.ctx[1];
    	}

    	set title(title) {
    		this.$$set({ title });
    		flush();
    	}

    	get id() {
    		return this.$$.ctx[2];
    	}

    	set id(id) {
    		this.$$set({ id });
    		flush();
    	}

    	get noJs() {
    		return this.$$.ctx[4];
    	}

    	set noJs(noJs) {
    		this.$$set({ noJs });
    		flush();
    	}
    }

    /* src/web-components/image-gallery.svelte generated by Svelte v3.50.0 */

    function create_if_block(ctx) {
    	let html_tag;
    	let raw_value = /*activeImage*/ ctx[3].outerHTML + "";
    	let t0;
    	let button0;
    	let t1;
    	let button1;
    	let t2;
    	let button2;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			html_tag = new HtmlTag(false);
    			t0 = space();
    			button0 = element("button");
    			t1 = space();
    			button1 = element("button");
    			t2 = space();
    			button2 = element("button");
    			html_tag.a = t0;
    			attr(button0, "title", "previous");
    			attr(button1, "title", "next");
    			attr(button2, "type", "button");
    			attr(button2, "title", "close");
    		},
    		m(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, button0, anchor);
    			insert(target, t1, anchor);
    			insert(target, button1, anchor);
    			insert(target, t2, anchor);
    			insert(target, button2, anchor);

    			if (!mounted) {
    				dispose = [
    					listen(button0, "click", /*click_handler*/ ctx[8]),
    					listen(button1, "click", /*click_handler_1*/ ctx[9]),
    					listen(button2, "click", /*close*/ ctx[4])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty & /*activeImage*/ 8 && raw_value !== (raw_value = /*activeImage*/ ctx[3].outerHTML + "")) html_tag.p(raw_value);
    		},
    		d(detaching) {
    			if (detaching) html_tag.d();
    			if (detaching) detach(t0);
    			if (detaching) detach(button0);
    			if (detaching) detach(t1);
    			if (detaching) detach(button1);
    			if (detaching) detach(t2);
    			if (detaching) detach(button2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	let section;
    	let dialog;
    	let focusTrap_action;
    	let t;
    	let div;
    	let slot;
    	let div_style_value;
    	let mounted;
    	let dispose;
    	let if_block = /*activeImage*/ ctx[3] && create_if_block(ctx);

    	return {
    		c() {
    			section = element("section");
    			dialog = element("dialog");
    			if (if_block) if_block.c();
    			t = space();
    			div = element("div");
    			slot = element("slot");
    			this.c = noop;
    			attr(dialog, "part", "dialog");
    			attr(div, "class", "grid");
    			attr(div, "part", "grid");
    			attr(div, "style", div_style_value = `--imageSize: calc(var(--${/*size*/ ctx[1]}Size) / 3);`);
    			attr(section, "class", "image-gallery");
    			attr(section, "id", /*id*/ ctx[0]);
    		},
    		m(target, anchor) {
    			insert(target, section, anchor);
    			append(section, dialog);
    			if (if_block) if_block.m(dialog, null);
    			append(section, t);
    			append(section, div);
    			append(div, slot);
    			/*section_binding*/ ctx[10](section);

    			if (!mounted) {
    				dispose = [
    					listen(window, "keydown", /*keydown_handler*/ ctx[7]),
    					action_destroyer(focusTrap_action = focusTrap.call(null, dialog, !!/*activeImage*/ ctx[3]))
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (/*activeImage*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(dialog, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (focusTrap_action && is_function(focusTrap_action.update) && dirty & /*activeImage*/ 8) focusTrap_action.update.call(null, !!/*activeImage*/ ctx[3]);

    			if (dirty & /*size*/ 2 && div_style_value !== (div_style_value = `--imageSize: calc(var(--${/*size*/ ctx[1]}Size) / 3);`)) {
    				attr(div, "style", div_style_value);
    			}

    			if (dirty & /*id*/ 1) {
    				attr(section, "id", /*id*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(section);
    			if (if_block) if_block.d();
    			/*section_binding*/ ctx[10](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { title = '' } = $$props;
    	let { id = slugify(title) } = $$props;
    	let { size = 'medium' } = $$props;
    	let component;
    	let isSvelteComponent;
    	let images;
    	let activeImage = null;

    	onMount(() => {
    		isSvelteComponent = Object.keys(component).includes('__svelte_meta');

    		// shadow dom timing is weird, use a timeout to fire this when the browser event loop is empty
    		setTimeout(() => {
    			if (isSvelteComponent) {
    				images = [...component.getElementsByClassName('grid')[0].children];
    			} else {
    				$$invalidate(0, id = id || slugify(title));
    				$$invalidate(2, component.id = id, component);

    				// have to copy the filter to be able to use it here, but don't do it multiple times
    				if (!component.getElementsByClassName('svg-filters').length) {
    					component.append(document.getElementsByClassName('svg-filters')[0].cloneNode(true));
    				}

    				images = component.getElementsByClassName('grid')[0].getElementsByTagName('slot')[0].assignedElements();
    			}

    			images && images.forEach(image => {
    				image.tabIndex = 0;
    				image.addEventListener('click', event => setActiveImage(image, event));
    				image.addEventListener('keydown', event => setActiveImage(image, event));
    			});
    		});
    	});

    	function setActiveImage(image, event) {
    		// handle keyboard stuff
    		if (event && event.code) {
    			// prevent the spacebar from scrolling the page
    			if (['Space'].includes(event.code)) event.preventDefault();

    			if (!['Space', 'Enter'].includes(event.code)) return;
    		}

    		$$invalidate(3, activeImage = image);

    		// careful... you are mutating the original image here
    		$$invalidate(3, activeImage.tabIndex = -1, activeImage);

    		activeImage.classList.add('gallery-active-image');
    		const dialog = component.getElementsByTagName('dialog')[0];
    		if (!dialog.open) dialog.showModal();
    	}

    	function close() {
    		if (activeImage) {
    			component.getElementsByTagName('dialog')[0].close();

    			// make sure to reset these
    			$$invalidate(3, activeImage.tabIndex = 0, activeImage);

    			activeImage.classList.remove('gallery-active-image');
    			$$invalidate(3, activeImage = null);
    		}
    	}

    	function navigate(direction, event) {
    		// prevent the arrow keys from scrolling the page
    		event.preventDefault();

    		const total = images.length;
    		const current = images.indexOf(activeImage);

    		// make sure to reset these
    		$$invalidate(3, activeImage.tabIndex = 0, activeImage);

    		activeImage.classList.remove('gallery-active-image');
    		const next = current + direction;

    		if (next === total) {
    			setActiveImage(images[0]);
    		} else if (next < 0) {
    			setActiveImage(images[total - 1]);
    		} else {
    			setActiveImage(images[next]);
    		}
    	}

    	const keydown_handler = event => {
    		activeImage && event.key === 'Escape' ? close() : null;

    		activeImage && event.key === 'ArrowLeft'
    		? navigate(-1, event)
    		: null;

    		activeImage && event.key === 'ArrowUp'
    		? navigate(-1, event)
    		: null;

    		activeImage && event.key === 'ArrowRight'
    		? navigate(1, event)
    		: null;

    		activeImage && event.key === 'ArrowDown'
    		? navigate(1, event)
    		: null;
    	};

    	const click_handler = event => navigate(-1, event);
    	const click_handler_1 = event => navigate(1, event);

    	function section_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			component = $$value;
    			$$invalidate(2, component);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(6, title = $$props.title);
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    	};

    	return [
    		id,
    		size,
    		component,
    		activeImage,
    		close,
    		navigate,
    		title,
    		keydown_handler,
    		click_handler,
    		click_handler_1,
    		section_binding
    	];
    }

    class Image_gallery extends SvelteElement {
    	constructor(options) {
    		super();

    		this.shadowRoot.innerHTML = `<style>:global([data-no-js]) .image-gallery .grid,:global([data-no-js]) :global(rf-image-gallery){--imageSize:calc(var(--largeSize) / 3) !important}.image-gallery .grid,:global(rf-image-gallery::part(grid)),:global([data-no-js]) :global(rf-image-gallery){display:grid;grid-gap:var(--padding);gap:var(--padding);grid-template-columns:repeat(auto-fit, minmax(min(var(--imageSize), 100%), 1fr));grid-template-rows:auto;justify-content:center;align-items:start}.image-gallery :global(:where(figure)),:global(rf-image-gallery) :global(:where(figure)),.image-gallery :global(:where(img)),:global(rf-image-gallery) :global(:where(img)){display:block;inline-size:100%;margin:0;aspect-ratio:1 / 1;-o-object-fit:cover;object-fit:cover;position:relative;inset-block-start:0;transition:var(--transitionSpeed)}.image-gallery :global(:where(figure):hover),:global(rf-image-gallery) :global(:where(figure):hover),.image-gallery :global(:where(figure):focus),:global(rf-image-gallery) :global(:where(figure):focus),.image-gallery :global(:where(img):hover),:global(rf-image-gallery) :global(:where(img):hover),.image-gallery :global(:where(img):focus),:global(rf-image-gallery) :global(:where(img):focus){inset-block-start:calc(-0.5 * var(--padding))}.image-gallery :global(:where(figure):hover) :global(img),:global(rf-image-gallery) :global(:where(figure):hover) :global(img),.image-gallery :global(:where(figure):focus) :global(img),:global(rf-image-gallery) :global(:where(figure):focus) :global(img){inset-block-start:0}.image-gallery dialog :global(figure):hover,.image-gallery dialog :global(figure):focus,.image-gallery dialog :global(img):hover,.image-gallery dialog :global(img):focus{inset-block-start:0}.image-gallery dialog,:is(*::part(dialog)){--buttonSize:calc(8 * var(--pixelSize));--imageBlockSize:calc(100vmin - (5 * var(--padding)));--imageInlineSize:calc(100vmin - (4 * var(--padding)) - (2 * var(--buttonSize)))}.image-gallery dialog:empty,:is(*::part(dialog)):empty{pointer-events:none}.image-gallery dialog,:is(*::part(dialog)){box-sizing:border-box;border:none;background-color:transparent;block-size:100%;inline-size:100%;display:grid;padding:calc(0.5 * var(--padding));grid-template-columns:1fr fit-content(var(--imageInlineSize)) 1fr;grid-template-rows:1fr fit-content(calc(var(--imageBlockSize))) 1fr;grid-template-areas:". .     . "
    ". image . "
    ". .     . ";align-items:center;color:var(--colorText)}.image-gallery dialog :is(img),:is(*::part(dialog)) :is(img){filter:var(--imgFilter)}.image-gallery dialog :is(img, figure),:is(*::part(dialog)) :is(img, figure){grid-area:image;aspect-ratio:unset;-o-object-fit:initial;object-fit:initial;max-block-size:var(--imageBlockSize);max-inline-size:var(--imageInlineSize);block-size:auto;inline-size:auto;margin:0;text-align:center;background-color:var(--colorBackground);display:grid;grid-template-columns:fit-content(100%);grid-template-rows:1fr auto}.image-gallery dialog :is(img, figure) :is(img),:is(*::part(dialog)) :is(img, figure) :is(img){grid-column:1 / 2;grid-row:1 / 2;max-block-size:100% !important;margin-inline:auto}.image-gallery dialog :is(img, figure) :is(figcaption),:is(*::part(dialog)) :is(img, figure) :is(figcaption){grid-column:1 / 2;grid-row:2 / 3;display:block;max-inline-size:calc((2 * var(--padding) + var(--readableMax)));margin-inline:auto;color:var(--colorText);padding:var(--padding)}.image-gallery dialog :global(img),:is(*::part(dialog)) :global(img){filter:var(--imgFilter)}.image-gallery dialog :global(img),:is(*::part(dialog)) :global(img),.image-gallery dialog :global(figure),:is(*::part(dialog)) :global(figure){grid-area:image;aspect-ratio:unset;-o-object-fit:initial;object-fit:initial;max-block-size:var(--imageBlockSize);max-inline-size:var(--imageInlineSize);height:auto;width:auto;margin:0;text-align:center;background-color:var(--colorBackground);display:grid;grid-template-columns:fit-content(100%);grid-template-rows:1fr auto}.image-gallery dialog :global(img) :global(img),:is(*::part(dialog)) :global(img) :global(img),.image-gallery dialog :global(figure) :global(img),:is(*::part(dialog)) :global(figure) :global(img){grid-column:1 / 2;grid-row:1 / 2;max-block-size:100% !important;margin-inline:auto}.image-gallery dialog :global(img) :global(figcaption),:is(*::part(dialog)) :global(img) :global(figcaption),.image-gallery dialog :global(figure) :global(figcaption),:is(*::part(dialog)) :global(figure) :global(figcaption){grid-column:1 / 2;grid-row:2 / 3;display:block;max-inline-size:calc((2 * var(--padding) + var(--readableMax)));margin-inline:auto;color:var(--colorText);padding:var(--padding)}:global(body:not([data-no-js])) .image-gallery :global(figure),:global(body:not([data-no-js])) :global(rf-image-gallery) :global(figure),:global(body:not([data-no-js])) .image-gallery :global(img),:global(body:not([data-no-js])) :global(rf-image-gallery) :global(img){cursor:pointer}:global(body:not([data-no-js])) .image-gallery :global(figcaption),:global(body:not([data-no-js])) :global(rf-image-gallery) :global(figcaption){display:none}:global(body:not([data-no-js])) .image-gallery :global(dialog) :global(figcaption),:global(body:not([data-no-js])) :global(rf-image-gallery) :global(dialog) :global(figcaption){display:block}button{cursor:pointer;block-size:var(--buttonSize);inline-size:var(--buttonSize);padding:0;border:none;color:var(--colorText);position:relative;background-color:var(--colorBackground);grid-area:image;outline:calc(0.5 * var(--pixelSize)) solid var(--colorText)}button::after{content:'';display:block;position:absolute;color:var(--colorText);inset-block-start:calc(1.5 * var(--pixelSize));inset-inline-end:calc(1.5 * var(--pixelSize));inset-block-end:calc(1.5 * var(--pixelSize));inset-inline-start:calc(1.5 * var(--pixelSize))}button[title='previous']{transform:rotate(var(--writingModeRotation)) scale(200%) scale(-1);justify-self:start;inset-inline-start:calc(-0.5 * var(--buttonSize))}button[title='next']{transform:rotate(var(--writingModeRotation)) scale(200%);justify-self:end;inset-inline-end:calc(-0.5 * var(--buttonSize))}button[title='previous']::after,button[title='next']::after{background:var(--pixelArrow);transition:0ms}button[title='previous']:hover::after,button[title='next']:hover::after,button[title='previous']:focus::after,button[title='next']:focus::after{background:var(--pixelArrowHover);transition:var(--transitionSpeedIcons)}button[title='close']{transform:scale(200%);align-self:start;justify-self:end;inset-block-start:calc(-0.5 * var(--buttonSize));inset-inline-end:calc(-0.5 * var(--buttonSize))}button[title='close']::after{background:var(--pixelX)}button[title='close']:hover::after,button[title='close']:focus::after{background:var(--pixelXHover);transition:var(--transitionSpeedIcons)}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance$1,
    			create_fragment$1,
    			safe_not_equal,
    			{ title: 6, id: 0, size: 1 },
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["title", "id", "size"];
    	}

    	get title() {
    		return this.$$.ctx[6];
    	}

    	set title(title) {
    		this.$$set({ title });
    		flush();
    	}

    	get id() {
    		return this.$$.ctx[0];
    	}

    	set id(id) {
    		this.$$set({ id });
    		flush();
    	}

    	get size() {
    		return this.$$.ctx[1];
    	}

    	set size(size) {
    		this.$$set({ size });
    		flush();
    	}
    }

    /* src/web-components/tabs.svelte generated by Svelte v3.50.0 */

    function create_fragment(ctx) {
    	let div;
    	let slot0;
    	let t;
    	let slot1;

    	return {
    		c() {
    			div = element("div");
    			slot0 = element("slot");
    			t = space();
    			slot1 = element("slot");
    			this.c = noop;
    			attr(slot0, "name", "tablist");
    			attr(div, "class", "tabs");
    			attr(div, "id", /*groupId*/ ctx[1]);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, slot0);
    			append(div, t);
    			append(div, slot1);
    			/*div_binding*/ ctx[3](div);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*groupId*/ 2) {
    				attr(div, "id", /*groupId*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    			/*div_binding*/ ctx[3](null);
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { name } = $$props;
    	let component;
    	let groupId = slugify(name);
    	let isSvelteComponent;
    	let elements, tabIds;
    	let activeTab = null;

    	onMount(() => {
    		isSvelteComponent = Object.keys(component).includes('__svelte_meta');

    		// web-components don't get this until browser run time, set it again
    		$$invalidate(1, groupId = groupId || slugify(name));

    		// shadow dom timing is weird, use a timeout to fire this when the browser event loop is empty
    		setTimeout(() => {
    			// make these 'globally' available to all the functions that might need them
    			elements = getElements();

    			tabIds = getTabIds();

    			// the component will just render the semantic equivalent of <div>s
    			// so apply a11y attributes dynamically so screenreaders work [1]
    			addAttributes();

    			setInitialActiveTab();
    			addEventListeners();
    		});
    	});

    	function getElements() {
    		let tablist, tabs, panels;

    		if (isSvelteComponent) {
    			const htmlChildren = [...component.children];
    			tablist = htmlChildren.find(node => node.tagName === 'TABLIST');
    			tabs = [...tablist.children];
    			panels = htmlChildren.filter(node => node.tagName === 'PANEL');
    		} else {
    			const slots = [...component.children];
    			tablist = slots.find(slot => slot.name === 'tablist').assignedElements()[0];
    			tabs = [...tablist.children];
    			panels = [...slots.find(slot => !slot.name).assignedElements()].filter(node => node.tagName === 'PANEL');
    		}

    		return { tablist, tabs, panels };
    	}

    	function getTabIds() {
    		const { tabs } = elements;
    		const ids = [];

    		for (const tab of tabs) {
    			// get the id to add to the panels later
    			const constructedId = `${groupId}-${tab.id}`;

    			ids.push(constructedId);
    		}

    		return ids;
    	}

    	function addAttributes() {
    		const { tablist, tabs, panels } = elements;
    		component.setAttribute('id', groupId);
    		component.setAttribute('aria-label', name);
    		tablist.setAttribute('role', 'tablist');
    		tablist.setAttribute('tabindex', '-1');

    		for (const [index, tab] of tabs.entries()) {
    			tab.setAttribute('id', tabIds[index]);
    			tab.setAttribute('tabindex', '-1');
    			tab.setAttribute('type', 'button');
    			tab.setAttribute('role', 'tab');
    		}

    		for (const [index, panel] of panels.entries()) {
    			panel.setAttribute('role', 'tabpanel');
    			panel.setAttribute('aria-labelledby', tabIds[index]);
    		}
    	}

    	function setInitialActiveTab() {
    		const { tabs, panels } = elements;

    		// when the component initially loads set the first tab active,
    		// css should hide this attribute shuffling from the user
    		const locationHash = window.location.hash.replace('#', '');

    		const locationActiveTab = tabIds.includes(locationHash);

    		if (locationActiveTab) {
    			const activeIndex = tabIds.indexOf(locationHash);
    			setActiveTab(tabs[activeIndex].id);
    		} else {
    			setActiveTab(tabs[0].id);

    			if (isSvelteComponent) {
    				$$invalidate(0, component.dataset.activeTab = activeTab.id, component);
    			} else {
    				$$invalidate(0, component.parentNode.host.dataset.activeTab = activeTab.id, component);
    			}

    			tabs[0].setAttribute('tabindex', '0');
    			tabs[0].classList.add('active');
    			panels[0].classList.add('active');
    		}
    	}

    	function addEventListeners() {
    		const { tablist, tabs } = elements;
    		tablist.addEventListener('keydown', handleKeyboardEvents);

    		for (const tab of tabs) {
    			tab.addEventListener('click', event => setActiveTab(event.target.id));
    		}
    	}

    	function setActiveTab(id) {
    		const { tabs, panels } = elements;
    		activeTab = tabs.find(tab => tab.id === id);

    		if (isSvelteComponent) {
    			$$invalidate(0, component.dataset.activeTab = activeTab.id, component);
    		} else {
    			$$invalidate(0, component.parentNode.host.dataset.activeTab = activeTab.id, component);
    		}

    		for (const tab of tabs) {
    			tab.getAttribute('id') === activeTab.id
    			? (tab.classList.add('active'), tab.setAttribute('tabindex', '0'))
    			: (tab.classList.remove('active'), tab.setAttribute('tabindex', '-1'));
    		}

    		for (const panel of panels) {
    			panel.getAttribute('aria-labelledby') === activeTab.id
    			? panel.classList.add('active')
    			: panel.classList.remove('active');
    		}
    	}

    	function handleKeyboardEvents(event) {
    		const key = event.code;
    		if (!['Home', 'End', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) return;

    		// prevent the arrow keys from scrolling the page
    		event.preventDefault();

    		const { tabs } = elements;
    		const writingMode = getComputedStyle(component)['writing-mode'];
    		if (key === 'Home') return setActiveTab(tabs[0].id);
    		if (key === 'End') return setActiveTab(tabs[tabs.length - 1].id);
    		let direction;

    		if (writingMode === 'horizontal-tb' || writingMode === 'vertical-rl') {
    			['ArrowRight', 'ArrowDown'].includes(key)
    			? direction = 'forward'
    			: direction = 'backward';
    		} else if (writingMode === 'vertical-lr') {
    			['ArrowRight', 'ArrowDown'].includes(key)
    			? direction = 'forward'
    			: direction = 'backward';
    		}

    		const tabTotal = tabs.length - 1;
    		const activeTabIndex = tabs.indexOf(tabs.find(tab => tab === activeTab));

    		if (direction === 'forward') {
    			const nextTab = activeTabIndex + 1 <= tabTotal
    			? tabs[activeTabIndex + 1]
    			: tabs[0];

    			setActiveTab(nextTab.id);
    			nextTab.focus();
    		} else {
    			const previousTab = activeTabIndex - 1 >= 0
    			? tabs[activeTabIndex - 1]
    			: tabs[tabs.length - 1];

    			setActiveTab(previousTab.id);
    			previousTab.focus();
    		}
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			component = $$value;
    			$$invalidate(0, component);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    	};

    	return [component, groupId, name, div_binding];
    }

    class Tabs extends SvelteElement {
    	constructor(options) {
    		super();
    		this.shadowRoot.innerHTML = `<style>.tabs{--colorActive:var(--colorHighlight);--pixelOffset:calc(3 * var(--pixelSize));width:100%;display:flex;flex-direction:column;margin:var(--padding) 0}:global([data-no-js]) :global(tablist){display:none !important}:global([data-no-js]) :global(panel){display:block !important}:global([data-no-js]) :global(panel:before){display:none}:global([data-no-js]) :global(panel:not(:last-child)){-webkit-margin-after:var(--padding);margin-block-end:var(--padding)}:global(tablist){display:flex;gap:calc(0.25 * var(--padding));-webkit-padding-before:var(--pixelOffset);padding-block-start:var(--pixelOffset);position:relative;z-index:1;overflow:hidden}:global(tab){flex:1;display:block;padding:calc(0.75 * var(--padding)) var(--padding);-webkit-padding-after:calc(var(--padding) + var(--pixelOffset));padding-block-end:calc(var(--padding) + var(--pixelOffset));-webkit-margin-after:calc((-0.5 * var(--padding)) - var(--pixelOffset));margin-block-end:calc((-0.5 * var(--padding)) - var(--pixelOffset));position:relative;inset-block-start:0;transition:var(--transitionSpeed);white-space:nowrap;line-height:0;cursor:pointer}:global(tab::before){content:'';display:block;position:absolute;color:var(--colorPrimary);background:var(--pixelBorder);inset:0;z-index:-1}:global(tab:hover),:global(tab:focus){text-decoration:underline;text-decoration-thickness:var(--pixelSize);inset-block-start:calc(-0.5 * var(--pixelOffset))}:global(rf-tabs:not([data-active-tab])) :global(tab:nth-of-type(1)),:global(rf-tabs[data-active-tab]) :global(tab.active),:global(.tabs:not([data-active-tab])) :global(tab:nth-of-type(1)),:global(.tabs[data-active-tab]) :global(tab.active),:global(tab.active){color:var(--colorBackground)}:global(rf-tabs:not([data-active-tab])) :global(tab:nth-of-type(1)::before),:global(rf-tabs[data-active-tab]) :global(tab.active::before),:global(.tabs:not([data-active-tab])) :global(tab:nth-of-type(1)::before),:global(.tabs[data-active-tab]) :global(tab.active::before),:global(tab.active::before){color:var(--colorActive);background:var(--pixelBorderFill)}:global(panel){width:100%;display:none;padding:var(--padding);position:relative}:global(panel::before),:global(panel::after){content:'';display:block;position:absolute}:global(panel:before){background:var(--colorBackground);inset-block-start:0;inset-inline-start:0;inset-inline-end:0;block-size:calc(var(--padding) - var(--pixelSize));-webkit-border-before:var(--pixelSize) solid var(--colorActive);border-block-start:var(--pixelSize) solid var(--colorActive);-webkit-border-start:var(--pixelSize) solid var(--colorActive);border-inline-start:var(--pixelSize) solid var(--colorActive);-webkit-border-end:var(--pixelSize) solid var(--colorActive);border-inline-end:var(--pixelSize) solid var(--colorActive);z-index:1}:global(panel::after){content:'';display:block;position:absolute;inset:0;color:var(--colorActive);background:var(--pixelBorder);pointer-events:none}:global(panel)>:global(*){position:relative;z-index:2}:global(rf-tabs:not([data-active-tab])) :global(panel:nth-of-type(1)),:global(rf-tabs[data-active-tab]) :global(panel.active),:global(.tabs:not([data-active-tab])) :global(panel:nth-of-type(1)),:global(.tabs[data-active-tab]) :global(panel.active),:global(panel.active){display:revert}</style>`;

    		init(
    			this,
    			{
    				target: this.shadowRoot,
    				props: attribute_to_object(this.attributes),
    				customElement: true
    			},
    			instance,
    			create_fragment,
    			safe_not_equal,
    			{ name: 2 },
    			null
    		);

    		if (options) {
    			if (options.target) {
    				insert(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["name"];
    	}

    	get name() {
    		return this.$$.ctx[2];
    	}

    	set name(name) {
    		this.$$set({ name });
    		flush();
    	}
    }

    // use `customElements.define()` in this file,
    customElements.define('rf-alert', Alert);
    customElements.define('rf-image-gallery', Image_gallery);
    customElements.define('rf-note', Note);
    customElements.define('rf-tabs', Tabs);

    // https://www.colorglare.com/svelte-components-as-web-components-b400d1253504

    // customElements.define('rf-NAME',
    //   class extends HTMLElement {
    //     constructor() {
    //       super()
    //       const shadowRoot = this.attachShadow({ mode: 'open' })
    //       this._element = new COMPONENT({
    //         target: shadowRoot,
    //         props: {
    //           something: this.getAttribute('innerText')
    //         }
    //       })
    //     }
    //     disconnectedCallback() {
    //       if (this._element && this._element.$destroy) {
    //         this._element.$destroy()
    //       }
    //     }
    //   }
    // )

})();
//# sourceMappingURL=web-components.js.map
