import autoAnimate from '@formkit/auto-animate'
import { vi } from 'vitest'
import { autoAnimateRef } from '@/utils/autoAnimateRef'

vi.mock('@formkit/auto-animate')

it('animates the element and stops once React detaches it', () => {
  const destroy = vi.fn()
  vi.mocked(autoAnimate).mockReturnValue({
    parent: document.body,
    enable: vi.fn(),
    disable: vi.fn(),
    isEnabled: () => true,
    destroy,
  })
  const list = document.createElement('ul')

  const cleanup = autoAnimateRef(list)
  expect(autoAnimate).toHaveBeenCalledWith(list)

  cleanup?.()
  expect(destroy).toHaveBeenCalledTimes(1)
})

it('ignores a missing element', () => {
  expect(autoAnimateRef(null)).toBeUndefined()
})
