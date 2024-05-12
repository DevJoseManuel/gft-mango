import { it, expect, describe, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { NormalRange, NormalRangeProps } from './NormalRange'

describe('NormalRange', () => {
  // Helpers.
  // ---------------------------------------------------------------------------
  const DEFAULT_MAX_VALUE = 1000
  const DEFAULT_MIN_VALUE = 0

  const renderComponent = (props: Partial<NormalRangeProps> = {}) => {
    const defaultProps: NormalRangeProps = {
      max: DEFAULT_MAX_VALUE,
      min: DEFAULT_MIN_VALUE,
      onChange: vi.fn()
    }
    return render(<NormalRange {...defaultProps} {...props} />)
  }

  const getInputs = () => screen.getAllByRole('textbox')
  const getInputMax = () => getInputs()[1]
  const getInputMin = () => getInputs()[0]

  // Test cases.
  // ---------------------------------------------------------------------------
  it('should not be rendered if min > max', () => {
    const { container } = renderComponent({ max: 0, min: 1000 })

    expect(container).toBeEmptyDOMElement()
  })

  it('should render the min and max range values', () => {
    renderComponent()

    const inputMin = getInputMin()
    const inputMax = getInputMax()

    expect(inputMin).toBeInTheDocument()
    expect(inputMax).toBeInTheDocument()
    expect(inputMin).toHaveValue('0')
    expect(inputMax).toHaveValue('1000')
  })

  it('should handles min value change correctly', async () => {
    const onChange = vi.fn()
    renderComponent({ onChange })

    const inputMin = getInputMin()
    fireEvent.click(inputMin)

    await waitFor(() => {
      fireEvent.change(inputMin as HTMLInputElement, {
        target: { value: '500' }
      })
    })

    expect(inputMin).toHaveValue('500')
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith(500, DEFAULT_MAX_VALUE)
  })

  it('should handles max value change correctly', async () => {
    const onChange = vi.fn()
    renderComponent({ onChange })

    const inputMax = getInputMax()
    fireEvent.click(inputMax)

    await waitFor(() => {
      fireEvent.change(inputMax as HTMLInputElement, {
        target: { value: '500' }
      })
    })

    expect(inputMax).toHaveValue('500')
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith(DEFAULT_MIN_VALUE, 500)
  })

  it('should render an error when the min value is greater than the max value', async () => {
    renderComponent()

    const inputMin = getInputMin()
    fireEvent.click(inputMin)

    await waitFor(() => {
      fireEvent.change(inputMin as HTMLInputElement, {
        target: { value: DEFAULT_MAX_VALUE + 1 }
      })
    })

    const error = screen.getByText(
      /Minimum value cannot be greater than the maximum value./i
    )

    expect(error).toBeInTheDocument()
  })

  it('should render an error when the max value is less than the min value', async () => {
    renderComponent()

    const inputMax = getInputMax()
    fireEvent.click(inputMax)

    await waitFor(() => {
      fireEvent.change(inputMax as HTMLInputElement, {
        target: { value: DEFAULT_MIN_VALUE - 1 }
      })
    })

    const error = screen.getByText(
      /Maximum value cannot be less than the minimum value./i
    )

    expect(error).toBeInTheDocument()
  })
})
