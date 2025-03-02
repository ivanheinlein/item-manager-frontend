import { shallowMount } from '@vue/test-utils';
import CreateCard from '@/components/UI/CreateCard.vue';

describe('CreateCard.vue', () => {
  it('should render correctly with default props', () => {
    const wrapper = shallowMount(CreateCard);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().to).toBeNull();
  });

  it('should render correctly with passed "to" prop', () => {
    const mockTo = { name: 'mockRoute' };
    const wrapper = shallowMount(CreateCard, {
      propsData: {
        to: mockTo,
      },
    });
    expect(wrapper.props().to).toBe(mockTo);
  });

  it('should emit "click" event when clicked', async () => {
    const wrapper = shallowMount(CreateCard);
    await wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click.length).toBe(1);
  });

  it('should have hover property on v-card', () => {
    const wrapper = shallowMount(CreateCard);
    const vCard = wrapper.find('v-card');
    expect(vCard.attributes().hover).toBeDefined();
  });
});
