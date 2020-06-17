import * as React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
} from 'react-admin';

export const BusinessComponentCreate = props => (
    <Create title="Create Business Component"{...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);