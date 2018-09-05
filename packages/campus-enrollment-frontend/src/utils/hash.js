// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

const encode = string => {
	if(typeof string !== 'string') throw new Error('tried to encode non-string')
	if(typeof TextEncoder === 'function'){
		return new TextEncoder('utf-8').encode(string)
	}
	return string.split('').map(a => a.charCodeAt(0))
}

export const sha256 = async string => {
	const hash = await crypto.subtle.digest('SHA-256', encode(string))
	return Array.from(new Uint8Array(hash)).map(
		b => ('00' + b.toString(16)).slice(-2)
	).join('')
}
