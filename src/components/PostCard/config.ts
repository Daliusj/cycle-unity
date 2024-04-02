import cyclistOnePng from '@/assets/avatars/cyclist-1.png';
import cyclistTwoPng from '@/assets/avatars/cyclist-2.png';
import cyclistThreePng from '@/assets/avatars/cyclist-3.png';
import cyclistFourPng from '@/assets/avatars/cyclist-4.png';
import cyclistFivePng from '@/assets/avatars/cyclist-5.png';

type AvatarPaths = Record<string, string>;
const AVATARS_PATHS: AvatarPaths = {
  cyclistOne: cyclistOnePng,
  cyclistTwo: cyclistTwoPng,
  cyclistThree: cyclistThreePng,
  cyclistFour: cyclistFourPng,
  cyclistFive: cyclistFivePng,
};

export default AVATARS_PATHS;
