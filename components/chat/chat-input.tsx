"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: 'conversation' | 'channel';
}

const formSchema = z.object({
    content: z.string().min(1)
})

export const ChatInput = ({
    apiUrl,
    query,
    name,
    type
}: ChatInputProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    async function onSubmit(value: z.infer<typeof formSchema>) {
        console.log(value);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button
                                    // a type of 'button' prevents enter from submitting
                                        type="button"
                                        onClick={() => {}}
                                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                                    >
                                        {/* PICK UP HERE, PLUS COMP */}
                                    </button>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
