"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormValues = { name: string; email: string; company: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = { name: "", email: "", company: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Informe seu nome.";
  if (!values.email.trim()) errors.email = "Informe um e-mail.";
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Informe um endereço de e-mail válido.";
  if (!values.message.trim()) errors.message = "Conte um pouco sobre o seu projeto.";
  return errors;
}

/**
 * services/contact/ doesn't exist yet (Fase 6+) — submission is simulated here.
 * UI/validation/states are the Fase 5 deliverable; real wiring comes later.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
    toast.success("Mensagem enviada! Retornaremos em até 1 dia útil.");
    setValues(EMPTY_VALUES);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          disabled={status === "submitting"}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-destructive text-xs">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={status === "submitting"}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-destructive text-xs">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="company">Empresa (opcional)</Label>
        <Input
          id="company"
          value={values.company}
          onChange={(e) => handleChange("company", e.target.value)}
          disabled={status === "submitting"}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          disabled={status === "submitting"}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-destructive text-xs">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" isLoading={status === "submitting"} className="mt-2">
        Enviar mensagem
      </Button>
    </form>
  );
}
