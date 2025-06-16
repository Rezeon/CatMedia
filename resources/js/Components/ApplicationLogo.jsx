import Logo from '@/Assets/logo/Group 2.png';

export default function ApplicationLogo(props) {
    return (
        <img
            src={Logo}
            alt="Logo"
            {...props}
        />
    );
}
