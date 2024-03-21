export function Label({ label }: any) {
  return (
    <div className="text-sm pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </div>
  );
}
