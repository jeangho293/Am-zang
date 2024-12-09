import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { DialogTitleGroup } from '../DialogTitleGroup';

type Marker = {
  position: {
    lat: number;
    lng: number;
  };
  placeName: string;
  address: string;
};

function SearchMapDialog(props: {
  onClose: () => void;
  setValue: ({
    address1,
    address2,
    lng,
    lat,
  }: {
    address1: string;
    address2: string;
    lng: number;
    lat: number;
  }) => void;
}) {
  // 1. destructure props
  const { onClose, setValue } = props;

  // 2. lib hooks
  // 3. state hooks
  const [search, setSearch] = useState('');
  const [address, setAddress] = useState({
    address1: '',
    address2: '',
    lat: 0,
    lng: 0,
  });
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [map, setMap] = useState<kakao.maps.Map>();

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  useEffect(() => {
    if (search && map) {
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(search, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          const pins: Marker[] = [];

          const places = data.length > 3 ? data.splice(0, 2) : data;
          places.forEach((result) => {
            const lat = Number(result.y);
            const lng = Number(result.x);

            pins.push({
              position: {
                lat,
                lng,
              },
              placeName: result.place_name,
              address: result.address_name,
            });

            bounds.extend(new kakao.maps.LatLng(lat, lng));
          });

          setMarkers(pins);
          map.setBounds(bounds);
        }
      });
    }
  }, [search]);
  // 8. handlers
  return (
    <Dialog open>
      <DialogTitleGroup title="Map" onClose={onClose} />
      <DialogContent>
        <Stack spacing={4} css={{ width: '480px' }}>
          <Stack spacing={4}>
            <Map
              center={{
                lat: 37.566826,
                lng: 126.9786567,
              }}
              level={3}
              onCreate={setMap}
              css={{ width: '100%', height: '240px' }}
            >
              {markers.map((marker) => (
                <MapMarker
                  key={`marker-${marker.position.lat}-${marker.position.lng}-${marker.placeName}`}
                  position={marker.position}
                  onClick={() =>
                    setAddress({
                      ...address,
                      address1: marker.address,
                      lat: marker.position.lat,
                      lng: marker.position.lng,
                    })
                  }
                >
                  {marker.placeName}
                </MapMarker>
              ))}
            </Map>
            <TextField
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setSearch((event.target as HTMLInputElement).value);
                }
              }}
            />
            <Divider orientation="horizontal" />
            <Typography>결과</Typography>
            <TextField disabled value={address.address1} />
            <TextField
              value={address.address2}
              onChange={(e) => setAddress({ ...address, address2: e.target.value })}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setValue({ ...address });
            onClose();
          }}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { SearchMapDialog };
