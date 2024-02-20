import ContentLoader from "react-content-loader";

const HeadBodyGrid = ({ ...rest }) => (
  <ContentLoader height="1000" width="1400" viewBox="0 0 265 230" {...rest}>
    <rect x="15" y="15" rx="4" ry="4" width="800" height="25" />
    <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
    <rect x="15" y="230" rx="2" ry="2" width="170" height="10" />
    <rect x="60" y="230" rx="2" ry="2" width="170" height="10" />
  </ContentLoader>
);

export default HeadBodyGrid;
