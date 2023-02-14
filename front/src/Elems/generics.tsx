import {ReactNode} from "react";

type ShowProps = {
    when: boolean,
    fallback?: JSX.Element,
    children?: ReactNode,
}

export function Show({when, fallback, children}: ShowProps) {
    if (when) {
        return <>{children}</>
    }

    if (fallback !== undefined) {
        return <>{fallback}</>
    }

    return null;
}
