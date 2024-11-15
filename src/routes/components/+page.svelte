<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion";
    import * as Avatar from "$lib/components/ui/avatar";
    import { Badge } from "$lib/components/ui/badge";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Calendar as UICalendar } from "$lib/components/ui/calendar";
    import * as Card from "$lib/components/ui/card";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import Combobox from "$lib/components/ui/combobox/Combobox.svelte";
    import * as Command from "$lib/components/ui/command";
    import DatePicker from "$lib/components/ui/date-picker/DatePicker.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Form from "$lib/components/ui/form";
    import Informations from "$lib/components/ui/informations/Informations.svelte";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Popover from "$lib/components/ui/popover";
    import * as RadioGroup from "$lib/components/ui/radio-group";
    import { RangeCalendar } from "$lib/components/ui/range-calendar";
    import { Slider } from "$lib/components/ui/slider";
    import { Switch } from "$lib/components/ui/switch";
    import { Textarea } from "$lib/components/ui/textarea";
    import Texte from "$lib/components/ui/texte/Texte.svelte";
    import { toast } from "svelte-sonner";
    import Title from "$lib/components/ui/title/Title.svelte";
    import ProfileAvatar from "$lib/components/ui/profileAvatar/ProfileAvatar.svelte";

    // Other import

    // Calendar / DatePicker / RangeCalendar

    import { getLocalTimeZone, today } from "@internationalized/date";

    // Card

    import BellRing from "lucide-svelte/icons/bell-ring";
    import Check from "lucide-svelte/icons/check";

    // Command

    import Calculator from "lucide-svelte/icons/calculator";
    import Calendar from "lucide-svelte/icons/calendar";
    import CreditCard from "lucide-svelte/icons/credit-card";
    import Settings from "lucide-svelte/icons/settings";
    import Smile from "lucide-svelte/icons/smile";
    import User from "lucide-svelte/icons/user";

    // Form

    import { formSchema, type FormSchema } from "$lib/schema/zod";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    // Variables

    // Calendar / DatePicker / RangeCalendar

    let value = today(getLocalTimeZone());

    // Card

    const notifications = [
        {
        title: "Your call has been confirmed.",
        description: "1 hour ago"
        },
        {
        title: "You have a new message!",
        description: "1 hour ago"
        },
        {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago"
        }
    ];

    // Form

    export let data: SuperValidated<Infer<FormSchema>>;

    const form = superForm(data, {
        validators: zodClient(formSchema),
    });

    const { form: formData, enhance } = form;
</script>

<div class="w-screen h-fit flex flex-col items-center gap-8 px-32 py-4">

    <Label>Accordion</Label>

    <Accordion.Root type="single" class="w-full">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
          <Accordion.Content
            >Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content
          >
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Is it styled?</Accordion.Trigger>
          <Accordion.Content>
            Yes. It comes with default styles that matches the other components'
            aesthetic.
          </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>

    <Label>Avatar</Label>

    <Avatar.Root>
        <Avatar.Image src="https://picsum.photos/200/200" alt="@shadcn" />
        <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>

    <Label>Badge</Label>

    <Badge>New</Badge>

    <Label>Button</Label>

    <Button>Click me</Button>

    <Button variant="outline">Click me</Button>

    <Label>Calendar</Label>

    <UICalendar type="single" bind:value class="rounded-md border" />

    <Label>Card</Label>

    <Card.Root class="w-[380px]">
        <Card.Header>
          <Card.Title>Notifications</Card.Title>
          <Card.Description>You have 3 unread messages.</Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-4">
          <div class=" flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div class="flex-1 space-y-1">
              <p class="text-sm font-medium leading-none">Push Notifications</p>
              <p class="text-muted-foreground text-sm">
                Send notifications to device.
              </p>
            </div>
            <Switch />
          </div>
          <div>
            {#each notifications as notification, idx (idx)}
              <div
                class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span class="flex size-2 translate-y-1 rounded-full bg-sky-500"
                ></span>
                <div class="space-y-1">
                  <p class="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p class="text-muted-foreground text-sm">
                    {notification.description}
                  </p>
                </div>
              </div>
            {/each}
          </div>
        </Card.Content>
        <Card.Footer>
          <Button class="w-full">
            <Check class="mr-2 size-4" /> Mark all as read
          </Button>
        </Card.Footer>
    </Card.Root>

    <Label>Checkbox</Label>

    <div class="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <div class="grid gap-1.5 leading-none">
          <Label
            for="terms1"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </Label>
          <p class="text-muted-foreground text-sm">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
    </div>

    <Label>Combobox</Label>

    <Combobox data={[{ value: "one", label: "One" }, { value: "two", label: "Two" }]} item="item" />

    <Label>Command</Label>

    <Command.Root class="max-w-[450px] rounded-lg border shadow-md">
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item>
              <Calendar class="mr-2 size-4" />
              <span>Calendar</span>
            </Command.Item>
            <Command.Item>
              <Smile class="mr-2 size-4" />
              <span>Search Emoji</span>
            </Command.Item>
            <Command.Item>
              <Calculator class="mr-2 size-4" />
              <span>Calculator</span>
            </Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Settings">
            <Command.Item>
              <User class="mr-2 size-4" />
              <span>Profile</span>
              <Command.Shortcut>⌘P</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <CreditCard class="mr-2 size-4" />
              <span>Billing</span>
              <Command.Shortcut>⌘B</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <Settings class="mr-2 size-4" />
              <span>Settings</span>
              <Command.Shortcut>⌘S</Command.Shortcut>
            </Command.Item>
        </Command.Group>
        </Command.List>
    </Command.Root>

    <Label>Date Picker</Label>

    <DatePicker />

    <Label>Dialog</Label>

    <Dialog.Root>
        <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
          >Edit Profile</Dialog.Trigger
        >
        <Dialog.Content class="sm:max-w-[425px]">
          <Dialog.Header>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description>
              Make changes to your profile here. Click save when you're done.
            </Dialog.Description>
          </Dialog.Header>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">Name</Label>
              <Input id="name" value="Pedro Duarte" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="username" class="text-right">Username</Label>
              <Input id="username" value="@peduarte" class="col-span-3" />
            </div>
          </div>
          <Dialog.Footer>
            <Button type="submit">Save changes</Button>
          </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>

    <Label>Form</Label>

    <form method="POST" use:enhance>
        <Form.Field {form} name="username">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Username</Form.Label>
              <Input {...props} bind:value={$formData.username} />
            {/snippet}
          </Form.Control>
          <Form.Description>This is your public display name.</Form.Description>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Button>Submit</Form.Button>
    </form>

    <Label>Informations</Label>

    <Informations />

    <Label>Input</Label>

    <Input placeholder="Type something..." />

    <Label>Label</Label>

    <Label>Popover</Label>

    <Popover.Root>
        <Popover.Trigger class={buttonVariants({ variant: "outline" })}
          >Open</Popover.Trigger
        >
        <Popover.Content class="w-80">
          <div class="grid gap-4">
            <div class="space-y-2">
              <h4 class="font-medium leading-none">Dimensions</h4>
              <p class="text-muted-foreground text-sm">
                Set the dimensions for the layer.
              </p>
            </div>
            <div class="grid gap-2">
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="width">Width</Label>
                <Input id="width" value="100%" class="col-span-2 h-8" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="maxWidth">Max. width</Label>
                <Input id="maxWidth" value="300px" class="col-span-2 h-8" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="height">Height</Label>
                <Input id="height" value="25px" class="col-span-2 h-8" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="maxHeight">Max. height</Label>
                <Input id="maxHeight" value="none" class="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </Popover.Content>
    </Popover.Root>

    <Label>Radio Group</Label>

    <RadioGroup.Root value="comfortable">
        <div class="flex items-center space-x-2">
          <RadioGroup.Item value="default" id="r1" />
          <Label for="r1">Default</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroup.Item value="comfortable" id="r2" />
          <Label for="r2">Comfortable</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroup.Item value="compact" id="r3" />
          <Label for="r3">Compact</Label>
        </div>
    </RadioGroup.Root>

    <Label>Range Calendar</Label>

    <RangeCalendar />

    <Label>Slider</Label>

    <Slider />

    <Label>Switch</Label>

    <Switch />

    <Label>Textarea</Label>

    <Textarea placeholder="Type something..." />

    <Label>Texte</Label>

    <Texte>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </Texte>

    <Label>Toast</Label>

    <Button
        variant="outline"
        onclick={() =>
        toast.success("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
            label: "Undo",
            onClick: () => console.info("Undo")
            }
        })}
    >
        Show Toast
    </Button>

    <Label>Title</Label>

    <Title>Title</Title>
</div>