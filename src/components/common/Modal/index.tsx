import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

interface ModalProps {
	children: (closeModal: () => void) => React.ReactNode;
	renderModalTrigger?: React.ReactNode;
}

const Modal = ({ renderModalTrigger, children }: ModalProps) => {
	const [open, setOpen] = useState(false);

	const handleOpen = (next: boolean) => {
		setOpen(next);
	};

	const closeModal = () => {
		handleOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpen}>
			<DialogTrigger asChild>
				{renderModalTrigger ? (
					renderModalTrigger
				) : (
					<Button variant="outline" size="sm">
						모달
					</Button>
				)}
			</DialogTrigger>
			{open && children(closeModal)}
		</Dialog>
	);
};

export default Modal;
