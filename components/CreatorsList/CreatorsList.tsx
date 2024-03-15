import { Dispatch, SetStateAction, useState } from 'react';

import { ICreator } from '@/types';
import { getSlicedCreators } from '@/utils';

interface ICreatorsListProps {
  topCount: number;
  creators: ICreator[];
  setActiveCreator: Dispatch<SetStateAction<ICreator | null>>;
}

const CreatorsList = ({ topCount, creators, setActiveCreator }: ICreatorsListProps) => {
  const [isShowAll, setIsShowAll] = useState(false);

  return (
    <>
      {creators.length ? (
        <>
          <div className="flex flex-col gap-2 sm:max-h-[600px] overflow-auto max-h-[500px] pr-4">
            {(isShowAll ? creators : getSlicedCreators(creators, topCount)).map((creator) => (
              <div
                className="grid sm:grid-cols-[90px_auto] items-center bg-[#333333] p-2 max-w-md rounded-lg cursor-pointer"
                key={creator.id}
                onClick={() => setActiveCreator(creator)}
              >
                <span className="text-xs font-light">Creator ID:</span>
                <span className="text-base font-medium text-nowrap text-ellipsis overflow-hidden">{creator.id}</span>
                <span className="text-xs font-light">Creator Email:</span>
                <a
                  className="text-base underline font-medium text-nowrap text-ellipsis overflow-hidden"
                  href={`mailto:${creator.email}`}
                >
                  {creator.email}
                </a>
              </div>
            ))}
          </div>
          <button onClick={() => setIsShowAll(!isShowAll)}>Show {isShowAll ? 'Less' : 'More'}</button>
        </>
      ) : (
        <div>
          {new Array(topCount).fill(null).map((_, idx) => (
            <div className="card-skeleton h-24 min-w-80 sm:h-12 sm:min-w-96" key={idx} />
          ))}
        </div>
      )}
    </>
  );
};

export default CreatorsList;
