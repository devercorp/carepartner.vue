import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const Textarea = forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(({ className, ...props }, ref) => {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 md:text-14 flex field-sizing-content min-h-64 w-full rounded-md border bg-transparent px-12 py-8 text-xl shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		/>
	);
});

Textarea.displayName = 'Textarea';

export { Textarea };
