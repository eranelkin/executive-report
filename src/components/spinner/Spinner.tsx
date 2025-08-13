import './spinner.scss';
export default function Spinner(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
      <g className="spinner-paths-scope" clipPath="url(#clip0_4220_1830)">
        <path
          className="spinner-path"
          d="M11.8302 0.761353H12.4718L15.6125 6.21581L15.2829 6.78748H9.00101L8.68018 6.22981L11.8302 0.761353Z"
          fill="#00A7E2"
        />
        <path
          className="spinner-path"
          d="M11.8302 13.2385H12.4718L15.6125 7.78407L15.2829 7.2124H9.00101L8.68018 7.77007L11.8302 13.2385Z"
          fill="#0B73AF"
        />
        <path
          className="spinner-path"
          d="M8.31641 7.974H7.67474L4.5332 13.4282L4.86279 13.9998H11.1456L11.4664 13.4422L8.31641 7.974Z"
          fill="#0257A7"
        />
        <path
          className="spinner-path"
          d="M3.53721 13.2385H4.17887L7.32042 7.78431L6.99083 7.21265H0.70804L0.387207 7.77002L3.53721 13.2385Z"
          fill="#004B99"
        />
        <path
          className="spinner-path"
          d="M3.53721 0.761353H4.17887L7.32042 6.21552L6.99083 6.78719H0.70804L0.387207 6.22952L3.53721 0.761353Z"
          fill="#003595"
        />
        <path
          className="spinner-path"
          d="M7.6832 6.02612H8.32487L11.4664 0.571958L11.1371 0H4.85404L4.5332 0.557667L7.6832 6.02612Z"
          fill="#222F5D"
        />
      </g>
      <defs>
        <clipPath id="clip0_4220_1830">
          <rect width="15.2273" height="14" fill="white" transform="translate(0.38623)" />
        </clipPath>
      </defs>
    </svg>
  );
}
