type InfoRowProps = {
  label: string;
  children: React.ReactNode;
};

export function InfoRow({
  label,
  children,
}: InfoRowProps) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>

      {typeof children === "string" ? (
        <p>{children}</p>
      ) : (
        children
      )}
    </div>
  );
}
