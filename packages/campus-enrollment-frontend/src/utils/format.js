const defaultDateOptions = {year: 'numeric', month: 'long', day: 'numeric'}

export const formatDate = (input, extraOptions) => {
	const date = new Date(input)
	return new Date(date.getTime() + date.getTimezoneOffset() * 60000)
		.toLocaleDateString('pt-BR', {...defaultDateOptions, ...extraOptions})
		.replace(/^1 /, '1º ')
}
