import { configure, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { axe, toHaveNoViolations } from 'jest-axe'

// enzyme
configure({ adapter: new Adapter() })
global.render = render
global.mount = mount

// jest-axe
expect.extend(toHaveNoViolations)
global.expect = expect
global.axe = axe
