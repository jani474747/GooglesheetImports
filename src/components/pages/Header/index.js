import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ excelData, onSorting }) => {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    return (
        <thead>
            <tr>
                {excelData.map(({ name, field, sortable }) => (
                    <th
                        key={name}
                        onClick={() =>
                            sortable ? onSortingChange(field) : null
                        }
                    >
                        {name}

                        {sortingField && sortingField === field && (
                            <FontAwesomeIcon
                                icon={
                                    sortingOrder === "asc"
                                        ? "arrow-down"
                                        : "arrow-up"
                                }
                            />
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default Header;