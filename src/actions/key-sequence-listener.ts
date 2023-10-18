function keySequenceListener(
	element: HTMLElement,
	options: {
		sequence: string[]
		onMatch?: (sequenceIndex: number) => void
		onMismatch?: (sequenceIndex: number) => void
		onComplete: () => void
	}
) {
	const keystrokes: string[] = []
	let sequenceIndex = 0

	function listener(event: KeyboardEvent) {
		const target = event.target as HTMLElement
		const { sequence, onMatch, onMismatch, onComplete } = options

		function reset() {
			keystrokes.length = 0
			sequenceIndex = 0
		}

		if (target == element || element.contains(target)) {
			const nextInSequence = sequence[sequenceIndex]
			const key = event.key

			if (key.toLowerCase() === nextInSequence.toLowerCase()) {
				if (onMatch) onMatch(sequenceIndex)
				keystrokes.push(nextInSequence)
				sequenceIndex++
			} else {
				if (onMismatch) onMismatch(sequenceIndex)
				reset()
			}

			if (sequence.every((key) => keystrokes.includes(key))) {
				onComplete()
				reset()
			}
		}
	}

	element.addEventListener('keydown', listener)

	return {
		destroy() {
			element.removeEventListener('keydown', listener)
		}
	}
}

export default keySequenceListener
