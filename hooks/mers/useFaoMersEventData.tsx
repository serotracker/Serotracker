import { useMemo } from "react";
import { useFaoMersEventDataPartitioned } from './useFaoMersEventDataPartitioned';
import { useFaoMersEventDataPartitionKeys } from './useFaoMersEventDataPartitionKeys';

export const useFaoMersEventData = () => {
  const { data: partitionKeyData } = useFaoMersEventDataPartitionKeys();
  const dataArray = useFaoMersEventDataPartitioned({ partitionKeys: partitionKeyData?.allFaoMersEventPartitionKeys ?? [] })

  const faoMersEvents = useMemo(() => {
    if(dataArray.length > 0 && dataArray.every((element) => !!element.data)) {
      return dataArray
        .flatMap((element) => element.data?.partitionedFaoMersEvents.mersEvents ?? []);
    }
  }, [ dataArray ])

  return {
    faoMersEvents
  }
}
