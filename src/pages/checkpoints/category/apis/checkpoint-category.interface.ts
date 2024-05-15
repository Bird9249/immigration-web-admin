import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type CheckpointCategoryTableState = IOffsetBasePaginate;

export type CheckpointCategoryDetailResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    title: "ດ່ານຊາຍແດນສາກົນ";
    description: "ດ່ານ​ຊາຍ​ແດນ​ລາວ​ເປັນ​ປະຕູ​ທີ່​ສຳຄັນ​ສຳລັບ​ຜູ້​ເດີນທາງ​ເຂົ້າ​ຫຼື​ອອກ​ຈາກ​ປະ​ເທດ​ລາວ, ສະໜອງ​ການ​ບໍລິການ​ດ້ານ​ຄົນ​ເຂົ້າ​ເມືອງ​ແລະ​ພາສີ​ທີ່​ຈຳ​ເປັນ​ເພື່ອ​ປະສົບ​ການ​ຜ່ານ​ດ່ານ​ຊາຍ​ແດນ​ທີ່​ລຽບ​ງ່າຍ.";
    lang: "lo" | "en" | "zh_cn";
  }[];
};

export type CheckpointCategoryResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    title: string;
    lang: "lo" | "en" | "zh_cn";
  }[];
};

export interface CheckpointCategoriesResponse extends IPaginated {
  data: CheckpointCategoryResponse[];
}
