"use client";
import * as z from 'zod';
import qs from "query-string";
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/file-upload';
import { useModal } from '@/hooks/use-modal-store';


const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: 'Attachment is required.'
    })
})

export function MessageFileModal() {
    const { isOpen, onClose, type, data} = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "messageFile";
    const { apiUrl, query } = data;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: ''
        }
    });

    function handleClose() {
        form.reset();
        onClose();
    }

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async function(values: z.infer<typeof formSchema>) {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query
            })
            await axios.post(url, {
                ...values,
                content: values.fileUrl
            });

            form.reset();
            router.refresh();
            onClose();

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Add an attachment
                    </DialogTitle>

                    <DialogDescription className='text-center text-zinc-500'>
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>

                {/* Pass the props from the hook form declared earlier */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <div className='space-y-8 px-6'>
                            <div className='flex items-center justify-center text-center'>
                                <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    // the server image could only take an image,
                                                    // this can take either an image or a pdf
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                            <Button disabled={isLoading} variant='primary'>
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
