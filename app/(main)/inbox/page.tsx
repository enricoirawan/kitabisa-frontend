import InboxItem from "@/components/inbox/inbox-item";

const Inbox = () => {
  return (
    <div className="w-full flex flex-col h-screen">
      {/* Header */}
      <section className="h-16 bg-curelean-50 flex items-center justify-start">
        <p className="pl-5 py-5 text-neutral-0 font-bold">Inbox</p>
      </section>
      {/* Header */}

      {/* Notifications */}
      <InboxItem />
      {/* Notifications */}
    </div>
  );
};

export default Inbox;
