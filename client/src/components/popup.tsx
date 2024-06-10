// import classes from "./Popup.module.scss";
import ReactDOM from "react-dom";
import React, { isValidElement, cloneElement, Children } from "react";

const Backdrop = (props: { onClose: () => void; id?: string }) => {
	return (
		<div
			className="fixed top-0 left-0 w-full h-[100vh] z-55 bg-black/40"
			onClick={props.onClose}
			id={props.id}
		></div>
	);
};

const PopupOverlay = (props: { onClose: () => void; children: any }) => {
	const childrenWithProps = Children.map(props.children, (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, { onClose: props.onClose } as any);
		}

		return child;
	});

	return (
		<div className={`fixed top-20 left-0 right-0 z-60 m-auto md:w-[400px]`}>
			{childrenWithProps}
		</div>
	);
};

export const Popup = ({
	show = true,
	...props
}: {
	onClose: () => void;
	children: any;
	id?: string;
	show?: boolean;
}) => {
	const portalElement = document.getElementById("modal") as HTMLElement;

	React.useEffect(() => {
		if (show) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [show]);

	if (!show) {
		return null;
	}

	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onClose} id={props.id} />,
				portalElement,
			)}
			{ReactDOM.createPortal(
				<PopupOverlay onClose={props.onClose}>
					{props.children}
				</PopupOverlay>,
				portalElement,
			)}
		</>
	);
};
