import { Logo } from "@/components/ui/logo"

export const Navbar = () => {
    return (
        <div className="fixed x-50 top-0 px-4 w-full h-14 borger-b shadow-sm bg-white flex items-center">
            {/*TODO mobile sidebar*/}
            <div className="flex items center gap-x-4">
                <div className="hidden md:flex">
                    <Logo/>
                </div>
            </div>

        </div>
    )
}