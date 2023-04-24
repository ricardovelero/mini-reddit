import React from "react";
import { Title } from "../../components/title/Title";
import { Select } from "../../components/select/Select";

export const Header = () => {
    return (
        <div className="flex items-center justify-betweens">
            <Title />
            <Select />
        </div>
    );
};
