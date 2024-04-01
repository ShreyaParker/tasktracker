import "rsuite/dist/rsuite.css";

import {DateRangePicker} from "rsuite";

const CustomDateRangePicker = ({ value, onChange }) => {
    return (
        <DateRangePicker
            showOneCalendar
            value={value}
            onChange={onChange}
            format="yyyy-MM-dd"
            placement="bottomEnd"
        />
    );
};

export default CustomDateRangePicker;