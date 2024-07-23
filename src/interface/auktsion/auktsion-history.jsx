import React from "react";

const AuktionHistory = () => {
  return (
    <main>
      <div className="grid xl:grid-cols-5 lg:grid-cols-3 max-sm:grid-cols-1 sm:grid-cols-2 flex-1 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
          <div
            className="w-full h-full bg-card rounded-[24px] p-[16px] flex flex-col justify-start items-center gap-1"
            key={idx}
          >
            <img
              src="https://s3-alpha-sig.figma.com/img/e699/08ec/4d1a06f005fea30771b61b3a4f903dd3?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hDp9zObNSJ2BfAdlkuLzg3man5qr~dTPNzqqOEBgQKt-Gf0LJYrAIOCbSbKTzk3A-9AVBGxQ4LA4KMGBYqlQqys~BNHwqOtsOi7sC1YCBs-h5yUnaLm0UfMntV2bRvWlSGN5WnsaHeQBXJdOWJGmIGTk0eamelE0XPrUh7isz7vo5kZykeVjj0uAGt8azfItg0A6jGT-tkr~I0ygXneGM3B8u8ik3tXhQeryDSmp7JJlI-VM-aZVeupxpIPERxAadw4gnAYiyKb2Dei0Hf2YETiHgetO1WoD9VeL17r2fEvbrOqzXLbnHq4hHBm8bKqglrLX8RUx0y32kNZalXYFLA__"
              alt="logo"
              className="mb-[10px] w-16 h-16 rounded-full"
            />
            <h1 className="text-text-primary font-medium">Shawn Stone</h1>
            <p className="text-gray-500 font-bold">UI/UX Designer</p>
            <p className="text-gray-500">9/10</p>
            <p className="text-gray-500 py-1 px-2 border-border border-[1px] rounded-[4px] text-[12px]">
              9 Soldiers
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AuktionHistory;
