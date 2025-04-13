import Image from "next/image";
import Link from "next/link";

import edit_outline from "@/public/icons/edit_outline.svg";
import chevron_right_gray from "@/public/icons/chevron_right_gray.svg";

const EditProfileButton = () => {
  return (
    <Link legacyBehavior passHref href={"/profile/edit"}>
      <button className="flex items-center justify-between px-3 pt-3 pb-2">
        <div className="flex items-center justify-start">
          <Image alt="edit" src={edit_outline} />
          <p className="text-sm ml-5">Ubah Profile</p>
        </div>
        <Image
          alt="chevron_right_inactive"
          className="w-5 h-5"
          src={chevron_right_gray}
        />
      </button>
    </Link>
  );
};

export default EditProfileButton;
