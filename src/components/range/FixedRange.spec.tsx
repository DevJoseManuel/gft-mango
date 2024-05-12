import { it, expect, describe, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FixedRange, FixedRangeProps, SEGMENT_WIDTH } from './FixedRange'

describe('FixedRange', () => {
  // Helpers.
  // ---------------------------------------------------------------------------
  const values = [1, 2, 3, 4, 5]

  const renderComponent = (props: Partial<FixedRangeProps> = {}) => {
    const defaultProps: FixedRangeProps = {
      onChange: vi.fn(),
      values
    }
    return render(<FixedRange {...defaultProps} {...props} />)
  }

  // Test cases.
  // ---------------------------------------------------------------------------
  it('should not be rendered if only less than two different values', () => {
    const { container } = renderComponent({ values: [1, 1, 1, 1] })
    expect(container).toBeEmptyDOMElement()
  })

  it('should render the min and max range values', () => {
    renderComponent()

    const maxValue = screen.getByText(`${values[values.length - 1]} €`)
    const minValue = screen.getByText(`${values[0]} €`)

    expect(maxValue).toBeInTheDocument()
    expect(minValue).toBeInTheDocument()
  })

  it('should handles min value change correctly', async () => {
    const onChange = vi.fn()
    renderComponent({ onChange })

    const bulletMin = screen.getByTestId('bullet-min')

    await waitFor(() => {
      fireEvent.mouseDown(bulletMin)
      fireEvent.mouseMove(bulletMin)
      fireEvent.mouseUp(bulletMin)
    })

    expect(onChange).toHaveBeenCalledOnce()
  })

  it('should handles max value change correctly', async () => {
    const onChange = vi.fn()
    renderComponent({ onChange })

    const bulletMin = screen.getByTestId('bullet-max')

    await waitFor(() => {
      fireEvent.mouseDown(bulletMin)
      fireEvent.mouseMove(bulletMin)
      fireEvent.mouseUp(bulletMin)
    })

    expect(onChange).toHaveBeenCalledOnce()
  })
})
