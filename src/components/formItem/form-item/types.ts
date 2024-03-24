export interface IFormItemProps {
    addonAfter?: React.ReactNode
    addonBefore?: React.ReactNode
    asterisk?: boolean
    bordered?: boolean
    className?: string
    colon?: boolean
    extra?: React.ReactNode
    feedbackIcon?: React.ReactNode
    feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none' | (string & {})
    feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | (string & {})
    feedbackText?: React.ReactNode
    fullness?: boolean
    gridSpan?: number
    inset?: boolean
    label?: React.ReactNode
    labelAlign?: 'left' | 'right'
    labelStyle?: React.CSSProperties
    layout?: 'vertical' | 'horizontal' | 'inline'
    labelCol?: number
    optionalMarkHidden?: boolean
    prefixCls?: string
    size?: 'small' | 'default' | 'large'
    style?: React.CSSProperties
    tooltip?: React.ReactNode
    tooltipIcon?: React.ReactNode
    tooltipLayout?: 'icon' | 'text'
    labelWidth?: number | string
    labelWrap?: boolean
    wrapperAlign?: 'left' | 'right'
    wrapperCol?: number
    wrapperStyle?: React.CSSProperties
    wrapperWidth?: number | string
    wrapperWrap?: boolean
    getPopupContainer?: (node: HTMLElement) => HTMLElement
  }