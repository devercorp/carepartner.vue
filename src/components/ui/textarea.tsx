import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const Textarea = forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(({ className, ...props }, ref) => {
	return (
		<textarea
			ref={ref}
			data-slot="textarea"
			className={cn(
				// Base styles
				'flex w-full resize-none rounded-md border bg-transparent px-12 py-8 text-xl',
				'min-h-64',

				// Border and focus styles
				'border-input shadow-xs outline-none',
				'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]',

				// Placeholder and text styles
				'placeholder:text-muted-foreground md:text-14',

				// Validation states
				'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
				'dark:aria-invalid:ring-destructive/40',

				// Dark mode
				'dark:bg-input/30',

				// Transitions and disabled states
				'transition-[color,box-shadow]',
				'disabled:cursor-not-allowed disabled:opacity-50',

				className
			)}
			{...props}
		/>
	);
});

Textarea.displayName = 'Textarea';

export { Textarea };
