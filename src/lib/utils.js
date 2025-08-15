import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}
// src/lib/utils.js
export const checkImageExists = (url) => {
	return new Promise((resolve) => {
	  const img = new Image();
	  img.onload = () => resolve(true);
	  img.onerror = () => resolve(false);
	  img.src = url;
	});
  };