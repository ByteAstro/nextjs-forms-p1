"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  emailAddress: z.string().email(),
  accountType: z.enum(['personal', 'company']),
  companyName: z.string().optional(),
  password: z.string().min(3),
  passwordConfirm: z.string(),
}).refine((data) => {
  return data.password === data.passwordConfirm;
}, {
  message: "Password do not match",
  path: ["passwordConfirm"],
}).refine((data) => {
  if (data.accountType === "company") {
    return !!data.companyName;
  }
  return true;
}, {
  message: "Company name required",
  path: ["companyName"],
})

// Main Home component -----------------------------
export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      passwordConfirm: "",
      companyName: "",
    }
  });

  const accountType = form.watch("accountType");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  }

  return (
    <main className="bg-[#3C0753] text-white flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          className="max-w-md w-full flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => {
              return (<FormItem>
                <FormLabel>Email address: </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-white"
                    placeholder="Email address"
                    type="email"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>)
            }}
          />
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => {
              return (<FormItem>
                <FormLabel>Accout Type: </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>)
            }}
          />


          {accountType === "company" &&
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => {
                return (<FormItem>
                  <FormLabel>Company Name: </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-white"
                      placeholder="Company Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>)
              }}
            />}







          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (<FormItem>
                <FormLabel>Password: </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-white"
                    placeholder="Password"
                    type="password"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>)
            }}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => {
              return (<FormItem>
                <FormLabel>Password Confirm: </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-white"
                    placeholder="Password Confirm"
                    type="password"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>)
            }}
          />
          <Button type="submit" className="w-full bg-purple-500" >
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
