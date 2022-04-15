import { Html, Head, Main, NextScript } from "next/document";

function MyDocument() {
  return (
    <Html lang="ko">
      <Head>
        <script
          defer
          src="https://cdn.bootpay.co.kr/js/bootpay-3.3.1.min.js"
        ></script>

        <script
          defer
          src="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.js"
        ></script>

        <script
          defer
          src="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.min.js"
        ></script>
        <script
          defer
          src="https://cultureplace.s3.ap-northeast-2.amazonaws.com/script/channeltalk.js"
        ></script>
        {/* <script defer src="/script/quill/quill.htmlEditButton.min.js"></script> */}

        <script
          defer
          src="https://cultureplace.s3.ap-northeast-2.amazonaws.com/script/quill/addplugin.js"
        ></script>
        <link
          href="https://cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.css"
          rel="stylesheet"
        />
        <script
          defer
          src="https://embed.videodelivery.net/embed/sdk.latest.js"
        ></script>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.snow.min.css"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/quill-table-ui@1.0.5/dist/index.css"
          rel="stylesheet"
        />
        <link
          href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
