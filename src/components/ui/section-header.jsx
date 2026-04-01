function SectionHeader({
  title,
  description,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
  return (
    <header className={`max-w-3xl space-y-2 ${className}`.trim()}>
      <h2 className={`text-title font-semibold tracking-[-0.02em] text-ink ${titleClassName}`.trim()}>{title}</h2>
      {description ? <p className={`text-subtitle text-ink/72 ${descriptionClassName}`.trim()}>{description}</p> : null}
    </header>
  )
}

export default SectionHeader
