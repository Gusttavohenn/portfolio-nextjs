import { socialLinks } from '@/lib/social-links';

export default function Footer() {
    return (
        <footer>
            <div className="social-links">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <p>&copy; {new Date().getFullYear()} Gustavo Oliveira. Todos os direitos reservados.</p>
        </footer>
    );
}
