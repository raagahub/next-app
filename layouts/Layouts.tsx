import DashboardLayout from "./DashboardLayout";
import MainLayout from "./MainLayout";

export const Layouts = {
    Main: MainLayout,
    Dashboard: DashboardLayout,
};

export type LayoutKeys = keyof typeof Layouts;
