"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { MinimalTiptapEditor } from "@/components/custom/minimal-tiptap"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { EnvelopeOpenIcon, ReloadIcon } from "@radix-ui/react-icons"

type CreationData = {
    message: string;
    username: string;
    email: string;
}
const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email"
    }),
    message: z.string().min(1, {
        message: "Please write a message before submit"
    })
})
const EMAIL = "akash2003m@gmail.com";
const SUBJECT = "Hi Akash,"
// Encode the subject and body to be URL-safe
const generatorMailTo = (body: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(body)}`;

const ContactForm = ({ formSubmit }: { formSubmit: (data: CreationData) => Promise<{ username: string; id: number; }> }) => {
    const [isLoading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            message: ""
        },
    })
    const [mailtoLink, setMailtoLink] = useState<string>("");


    function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true)
        formSubmit(data).then((data) => {
            setLoading(false)
            toast({
                title: "Your message has been sent successfully",
                description: (
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className={cn("text-xl max-sm:text-lg font-medium text-muted-foreground")}>id</TableCell>
                                <TableCell className={cn("text-xl max-sm:text-lg font-medium")}>{data.id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={cn("text-xl max-sm:text-lg font-medium text-muted-foreground")}>Name</TableCell>
                                <TableCell className={cn("text-xl max-sm:text-lg font-medium")}>{data.username}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                ),
            })
            form.reset();
        }).catch(() => {
            setLoading(false)
            toast({
                title: "Error while sending message",
                description: (
                    <p>Oops! An error occured</p>
                ),
            })
        })
        setMailtoLink("")
    }

    const handleGenerateMailto = (data: z.infer<typeof FormSchema>) => {
        setMailtoLink(generatorMailTo(data.message))
        form.reset();
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xl">Name</FormLabel>
                            <FormControl>
                                <Input className="text-xl" placeholder="Andy" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Email</FormLabel>
                            <FormControl>
                                <Input className="text-lg" placeholder="example@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="col-span-2 max-md:col-span-1">
                            <FormLabel className="text-lg">Message</FormLabel>
                            <FormControl>
                                <MinimalTiptapEditor
                                    {...field}
                                    className="w-full"
                                    editorContentClassName="p-5"
                                    output="html"
                                    placeholder="Share something interesting about yourself—what's your hidden talent or unique story? I can't wait to hear from you!..."
                                    autofocus={false}
                                    immediatelyRender={false}
                                    editable={true}
                                    injectCSS={true}
                                    editorClassName="focus:outline-none"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-5">
                    <Button type="submit" className="w-fit" disabled={isLoading}>
                        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? "Loading" : "Submit"}
                    </Button>
                    or
                    {mailtoLink ? (<a className="flex gap-1 items-center bg-green-600 px-4 py-2 text-primary-foreground shadow hover:bg-green-600/90 rounded-md" href={mailtoLink} onClick={() => { setMailtoLink("") }}>
                        <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Send Email
                    </a>) : (<Button variant="secondary" onClick={form.handleSubmit(handleGenerateMailto)} className="w-fit">
                        <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Generate Email
                    </Button>)}
                </div>
            </form>
        </Form>
    )
}

export default ContactForm