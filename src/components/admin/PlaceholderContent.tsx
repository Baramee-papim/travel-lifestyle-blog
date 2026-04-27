type PlaceholderContentProps = {
  title: string;
};

const PlaceholderContent = ({ title }: PlaceholderContentProps) => (
  <div className="rounded-2xl border border-brown-300 bg-white p-8 text-brown-500">
    <h2 className="text-headline-4 text-brown-600">{title}</h2>
    <p className="mt-3 text-body-2 text-brown-400">This tab is ready for future content.</p>
  </div>
);

export default PlaceholderContent;
