"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

import { useModal } from '@/hooks/use-modal-store';
import { Label } from '@/components/ui/label';



export function InviteModal() {
    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === "invite";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className='p-6'>
                    {/* FINISH THIS CLASSNAME [https://youtu.be/ZbX4Ok9YX94?t=13149] */}
                    <Label className='uppercase text-xs font-bold -'>
                        Server Invite Link
                    </Label>
                </div>
            </DialogContent>
        </Dialog>
    )
}
