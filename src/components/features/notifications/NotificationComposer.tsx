import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSendNotification } from '@/hooks/useNotifications';
import { notificationSchema, type NotificationInput } from '@/lib/validators';
import { CLASS_LIST, SECTION_LIST } from '@/config/constants';

export function NotificationComposer() {
  const sendNotification = useSendNotification();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NotificationInput>({
    resolver: zodResolver(notificationSchema),
    defaultValues: { type: 'BROADCAST', sentVia: ['IN_APP'] },
  });

  const type = watch('type');
  const sentVia = watch('sentVia') ?? [];

  const toggleChannel = (channel: string) => {
    const current = sentVia;
    const updated = current.includes(channel as never)
      ? current.filter((c) => c !== channel)
      : [...current, channel];
    setValue('sentVia', updated as NotificationInput['sentVia']);
  };

  const onSubmit = (data: NotificationInput) => {
    sendNotification.mutate(data, { onSuccess: () => reset() });
  };

  const CHANNELS = [
    { id: 'IN_APP', label: 'In-App', cost: 'Free' },
    { id: 'SMS', label: 'SMS', cost: '₹0.18/msg' },
    { id: 'WHATSAPP', label: 'WhatsApp', cost: '₹0.40/msg' },
    { id: 'EMAIL', label: 'Email', cost: 'Free' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Title <span className="text-red-500">*</span></label>
          <Input {...register('title')} placeholder="Exam Schedule – Unit Test 1" />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Message <span className="text-red-500">*</span></label>
          <textarea
            {...register('body')}
            rows={4}
            placeholder="Write your message here..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
          />
          {errors.body && <p className="mt-1 text-xs text-red-600">{errors.body.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Recipient <span className="text-red-500">*</span></label>
          <Select value={type} onValueChange={(v) => setValue('type', v as NotificationInput['type'])}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BROADCAST">All Students</SelectItem>
              <SelectItem value="CLASS">Specific Class</SelectItem>
              <SelectItem value="PERSONAL">Individual Student</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {type === 'CLASS' && (
          <div className="flex items-center gap-3">
            <Select onValueChange={(v) => setValue('targetClass', v)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                {CLASS_LIST.map((c) => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select onValueChange={(v) => setValue('targetSection', v)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Section (opt.)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {SECTION_LIST.map((s) => <SelectItem key={s} value={s}>Section {s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Delivery Channels</label>
          <div className="flex flex-wrap gap-3">
            {CHANNELS.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => toggleChannel(ch.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  sentVia.includes(ch.id as never)
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {ch.label}
                <span className="text-xs text-gray-400">{ch.cost}</span>
              </button>
            ))}
          </div>
          {errors.sentVia && <p className="mt-1 text-xs text-red-600">{errors.sentVia.message}</p>}
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button type="submit" disabled={sendNotification.isPending}>
          <Send className="size-4" />
          {sendNotification.isPending ? 'Sending...' : 'Send Notification'}
        </Button>
      </div>
    </form>
  );
}
