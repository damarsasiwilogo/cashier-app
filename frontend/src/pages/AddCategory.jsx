import { Button, FormControl, Input } from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar";

export const AddCategoryPage = () => {
    return (
        <SidebarWithHeader>
            <FormControl>
                <Input placeholder="name" />
                <Button>
                    Add
                </Button>
            </FormControl>
        </SidebarWithHeader>
    );
}