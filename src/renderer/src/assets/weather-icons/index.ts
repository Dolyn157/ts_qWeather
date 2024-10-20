const icons: Record<string, { default: string }> = import.meta.glob('./*.svg', { eager: true, query: 'url' })

export default icons
