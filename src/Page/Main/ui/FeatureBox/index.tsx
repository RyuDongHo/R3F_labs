type FeatureBoxProps = {
  hrefLink: string;
  title: string;
  description: string;
  clickHandler?: () => void;
};

const FeatureBox = (props: FeatureBoxProps): React.ReactElement => {
  const { hrefLink, title, description, clickHandler } = props;
  return (
    <div
      onClick={clickHandler}
      className="feature-item min-w-[100px] bg-gradient-to-r from-blue-100 to-blue-200 h-[120px] w-full hover:bg-blue-300 cursor-pointer backdrop-blur-sm rounded-lg p-4 text-black max-w-xs shadow-lg overflow-hidden "
    >
      <a
        href={hrefLink}
        target="_blank"
        className="text-m font-semibold mb-2 underline hover:text-blue-200"
      >
        {title}
      </a>
      <p className="text-xs opacity-80">{description}</p>
    </div>
  );
};
export default FeatureBox;
