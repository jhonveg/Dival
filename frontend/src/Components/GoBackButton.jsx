import { useNavigate } from "react-router-dom";



export const BackButton = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  return (
    <button onClick={back} className="hover:scale-125 fade-in  ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="w-6 h-6 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
        />
      </svg>
    </button>
  );
};




export const NextButton = () => {
  const navigate = useNavigate();

  
  const next = () => {
    navigate(+1);
  };

  return (
    
      <button onClick={next} className="hover:scale-125 fade-in 0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-6 h-6 rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
          />
        </svg>
      </button>

  );
};

