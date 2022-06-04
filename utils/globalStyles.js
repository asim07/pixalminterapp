export default function GlobalStyles() {
  return (
    <style global jsx>
      {`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap");

        *,
        *:before,
        *:after {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        html {
          width: 100%;
          height: 100%;
        }

        body {
          height: 100%;
          -webkit-font-smoothing: antialiased;
          font-family: "DM Sans", sans-serif;
          font-weight: 400;
          color: #6d6d72;
          min-width: 1024px;
        }

        #__next {
          height: 100%;
        }

        a,
        a:visited {
          color: inherit;
          text-decoration: none;
          transition: color 0.25s;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
        }

        b,
        strong {
          font-weight: 700;
        }

        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          position: fixed;
          z-index: 9999;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #000000;
        }

        @keyframes play {
          from {
            background-position: 0 0;
          }
          to {
            background-position: -98% 0;
          }
        }
      `}
    </style>
  );
}
