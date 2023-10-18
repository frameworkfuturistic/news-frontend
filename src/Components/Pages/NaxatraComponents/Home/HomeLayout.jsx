import React from "react";

const HomeLayout = ({ data, wpx, header = "" }) => {
  return (
    <>
      <div className="w-screen flex justify-center items-center animate__animated animate__fadeIn animate__faster mt-8">
        <div
          className={`max-w-[${wpx}] h-full w-full grid grid-cols-12 md:px-10 gap-8`}
        >
          {header && (
            <header className="w-full col-span-12 border-t border-b">
              <span className="font-semibold pb-2 border-t-4 w-max border-red-600 pt-2 block">
                {header}
              </span>
            </header>
          )}

          <div className="col-span-12 md:col-span-4 flex flex-col">
            <img
              src={data?.bigNews?.image}
              alt="Image"
              srcset=""
              className="border h-60 w-full"
            />

            <div className="py-2 text-zinc-700">
              <span className="font-semibold text-xl line-clamp-2 text-ellipsis cursor-pointer hover:text-red-500" onClick={() => props?.getFun(data?.rightMenu?.id)}>
                {data?.bigNews?.heading}
              </span>
            </div>

            <div className="text-sm text-gray-500 flex justify-between">
              <span>{data?.bigNews?.place}</span>
              <span>{data?.bigNews?.date}</span>
            </div>

            <div className="text-sm text-gray-500 line-clamp-2 text-ellipsis">
              {data?.bigNews?.content}
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col gap-6 overflow-y-auto md:h-[45vh]">
            {data?.smallNews?.map((elem) => (
              <>
                <div className="flex items-center gap-2">
                  <div>
                    <img
                      src={elem?.image}
                      alt="image"
                      srcset=""
                      className="border h-14"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-800 text-sm cursor-pointer hover:text-red-500" onClick={() => props?.getFun(elem?.id)}>
                      {elem?.heading}
                    </span>
                    <span className="text-sm text-zinc-500">{elem?.date}</span>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col">

          {data?.rightMenu?.header && (
            <header className="w-full col-span-12 border-t border-b">
              <span className="font-semibold pb-2 border-t-4 w-max border-red-600 pt-2 block">
                {data?.rightMenu?.header}
              </span>
            </header>
          )}
          
          <video controls onError={(e) => console.log('Error loading video:', e)} className="border">
          <source src={data?.rightMenu?.source} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

            <div className="py-2 text-zinc-700">
              <span className="font-semibold text-xl line-clamp-2 text-ellipsis cursor-pointer hover:text-red-500" onClick={() => props?.getFun(data?.rightMenu?.id)}>
                {data?.rightMenu?.heading}
              </span>
            </div>

            <div className="text-sm text-gray-500 flex justify-between">
              <span>{data?.rightMenu?.place}</span>
              <span>{data?.rightMenu?.date}</span>
            </div>

            <div className="text-sm text-gray-500 line-clamp-2 text-ellipsis">
              {data?.rightMenu?.content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
