import { useState } from "react";
import "./App.css";

const dumyUrls = [
  {
    _id: "1",
    orginalUrl:
      "https://iplanet.one/products/iphone-18-pro-mjy44hn-a?variant=53524454113589&country=IN&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOooPpnJae1IglXwKvlAsArxChzAEAohYT7j54S-aEUvs7GZXg6Din7I",
    shortCode: "8RGSBy",
    clicks: 9,
  },
  {
    _id: "2",
    orginalUrl:
      "https://www.amazon.in/dp/B0HJBHPD3R/?_encoding=UTF8&pd_rd_w=L7Qyk&content-id=amzn1.sym.74e3949b-4fed-4275-b3b9-7f471a004d91&pf_rd_p=74e3949b-4fed-4275-b3b9-7f471a004d91&pf_rd_r=QTEJ2KYXMKDMVM56EJN5&pd_rd_wg=ZSu1n&pd_rd_r=16954be4-db43-440f-a553-03736ea8dfea&ref_=pd_hp_d_r_atf_unk&th=1",
    shortCode: "pMV7e3",
    clicks: 5,
  },
];

const App = () => {
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);

  return (
    <section className="p-10 flex flex-col gap-4">
      <div className="w-full max-w-4xl p-2"></div>
      <div className="w-full max-w-4xl p-2"></div>
      <div className="w-full max-w-4xl p-2">
        {urls.map((url) => {
          return (
            <div
              key={url._id}
              className="border border-neutral-200 p-2 flex flex-col gap-8 justify-evenly">
              <p className="truncate">{url.orginalUrl}</p>
              <div className="flext gap-2">
                <button className="p-2 rounded bg-orange-600 text-white cursor-pointer">COPY</button>
                <button className="p-2 rounded bg-orange-600 text-white cursor-pointer">DELETE</button>
              </div>
              <p>Short Code: {url.shortCode}</p>
              <p>Clicks: {url.clicks}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default App;
