
import { h } from 'preact';
import render from 'preact-render-to-string';
import Header from '../components/header';


describe('Header component', () => {
	it('should render header with content', () => {
		const tree = render(
			<Header content="Zouhir" />
		);
		expect(tree).toMatchSnapshot();
  });
  it('should render header with default fallback', () => {
		const tree = render(
			<Header />
		);
		expect(tree).toMatchSnapshot();
	});
});